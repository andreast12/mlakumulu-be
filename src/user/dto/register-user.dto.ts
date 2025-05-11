import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum UserRole {
  TOURIST = 'TOURIST',
  EMPLOYEE = 'EMPLOYEE',
}

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
