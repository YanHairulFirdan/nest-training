import { Body, Controller, Get, HttpCode, Inject, Post } from "@nestjs/common";
import UserService from "src/user/user.service";
import { RegisterUserDto } from "./register.dto";
import { Public } from "src/auth/decorators/public.decorator";
import LoginUserDto from "./login.dto";

@Controller({
    version: "1",
    path: "auth",
})
export class AuthController {
    @Inject()
    private userService: UserService;

    @HttpCode(200)
    @Post('/register')
    async register(@Body() data: RegisterUserDto) {
        const user = await this.userService.createUser(data);
        
        return { data: user };
    }

    @Public()
    @HttpCode(200)
    @Post("/login")
    async login(@Body() data: LoginUserDto) {
        const access_token = await this.userService.login({
            email: data.email,
            password: data.password,
        });

        return { data: { access_token } };
    }
}