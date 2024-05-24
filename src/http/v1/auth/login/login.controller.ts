import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import UserService from "src/user/user.service";
import LoginUserDto from "./login.dto";
import { Public } from "../decorators/public.decorator";
import ValidationExceptionFilter from "src/validation-rule/filters/validation-exception.filter";

@Controller({
  version: "1",
  path: "auth/login",
})
export default class LoginController {
  constructor(private userService: UserService) {}

  @Public()
  @UseFilters(new ValidationExceptionFilter())
  @HttpCode(200)
  @Post()
  async login(@Body() data: LoginUserDto) {
    const access_token = await this.userService.login({
      email: data.email,
      password: data.password,
    });

    return {
      data: { access_token }
    };
  }
}