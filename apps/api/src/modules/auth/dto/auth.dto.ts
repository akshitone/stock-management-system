import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../schemas/user.schema";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export class UserProfileDto {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
}
