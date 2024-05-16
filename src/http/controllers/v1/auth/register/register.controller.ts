import { Body, Controller, Get, HttpCode, Inject, Post } from "@nestjs/common";
import UserService from "src/user/user.service";
import { RegisterUserDto } from "./register.dto";

@Controller()
export default class RegisterController {
  @Inject()
  private userService: UserService;
  
  @HttpCode(200)
  @Post('auth/register')
  async register(@Body() data: RegisterUserDto) {
    const user = await this.userService.createUser(data);
    return {
      data: user,
    };
  }
}