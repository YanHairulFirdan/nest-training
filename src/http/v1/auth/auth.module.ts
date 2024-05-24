import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import RegisterController from "./register/register.controller";
import LoginController from "./login/login.controller";
import { APP_GUARD } from "@nestjs/core";
import AuthGuard from "./guards/auth.guard";

@Module({
    imports: [UserModule],
    controllers: [
        RegisterController,
        LoginController,
    ],
    providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        }
      ],
})
export class AuthModule {}