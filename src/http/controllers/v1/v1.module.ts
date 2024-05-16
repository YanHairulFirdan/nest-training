import { Module } from "@nestjs/common";
import RegisterController from "./auth/register/register.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [RegisterController],
})
export class V1Module {}