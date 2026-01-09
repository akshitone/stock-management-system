import { Injectable, UnauthorizedException, ConflictException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { User, UserDocument, UserRole } from "./schemas/user.schema";
import { LoginDto, RegisterDto, AuthResponseDto, RefreshTokenDto } from "./dto";
import { JwtPayload } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (!user.isActive) {
      throw new UnauthorizedException("Account is deactivated");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    user.lastLoginAt = new Date();
    await user.save();

    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name, role } = registerDto;

    const existingUser = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const user = new this.userModel({
      email: email.toLowerCase(),
      password,
      name,
      role: role || UserRole.USER,
    });

    await user.save();
    this.logger.log(`New user registered: ${email}`);

    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>("JWT_SECRET") || "default-secret",
      });

      const user = await this.userModel.findById(payload.sub).exec();
      if (!user || !user.isActive) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
  }

  async getProfile(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }

  async seedAdminUser(): Promise<void> {
    const adminEmail = this.configService.get<string>("ADMIN_EMAIL") || "admin@example.com";
    const adminPassword = this.configService.get<string>("ADMIN_PASSWORD") || "admin123";
    const adminName = this.configService.get<string>("ADMIN_NAME") || "Administrator";

    const existingAdmin = await this.userModel.findOne({ email: adminEmail }).exec();

    if (!existingAdmin) {
      const admin = new this.userModel({
        email: adminEmail,
        password: adminPassword,
        name: adminName,
        role: UserRole.ADMIN,
        isActive: true,
      });
      await admin.save();
      this.logger.log(`Admin user seeded: ${adminEmail}`);
    } else {
      this.logger.log(`Admin user already exists: ${adminEmail}`);
    }
  }

  private generateTokens(user: UserDocument): AuthResponseDto {
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const expiresIn = parseInt(this.configService.get<string>("JWT_EXPIRES_IN") || "3600", 10);

    const accessToken = this.jwtService.sign(payload, { expiresIn });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    return {
      accessToken,
      refreshToken,
      expiresIn,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
