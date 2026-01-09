import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto, RefreshTokenDto, AuthResponseDto, UserProfileDto } from "./dto";
import { Public } from "./decorators/public.decorator";
import { CurrentUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UserDocument } from "./schemas/user.schema";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post("register")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post("refresh")
  @Public()
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: UserDocument): Promise<UserProfileDto> {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    };
  }
}
