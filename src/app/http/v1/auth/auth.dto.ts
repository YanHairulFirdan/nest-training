import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Unique } from "src/validation-rule/rules/unique.rule";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Unique({
      column: 'email',
      table: 'users',
      attribute: 'email',
    })
    email: string;

    @IsNotEmpty()
    password: string;
  }
export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}