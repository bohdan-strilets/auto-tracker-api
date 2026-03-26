import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  declare token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  declare password: string;
}
