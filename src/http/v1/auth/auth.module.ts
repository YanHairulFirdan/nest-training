import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import RegisterController from "./register/register.controller";

@Module({
    imports: [UserModule],
    controllers: [RegisterController],
})
export class AuthModule {}