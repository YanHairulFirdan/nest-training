import { Body, Controller, Get, HttpCode, Inject, Post, UseFilters } from "@nestjs/common";
import UserService from "src/user/user.service";
import { RegisterUserDto } from "./register.dto";
import ValidationExceptionFilter from "src/validation-rule/filters/validation-exception.filter";

@Controller({
  version: '1',
})
export default class RegisterController {
  @Inject()
  private userService: UserService;
  
  @HttpCode(200)
  @UseFilters(new ValidationExceptionFilter())
  @Post('auth/register')
  async register(@Body() data: RegisterUserDto) {
    const user = await this.userService.createUser(data);
    return {
      data: user,
    };
  }
}