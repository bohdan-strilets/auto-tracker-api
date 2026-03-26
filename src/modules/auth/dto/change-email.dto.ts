import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  @IsEmail()
  @IsNotEmpty()
  declare newEmail: string;

  @IsString()
  @IsNotEmpty()
  declare password: string;
}
