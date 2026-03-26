import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  declare email: string;
}
