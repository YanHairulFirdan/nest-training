import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [AuthModule],
})
export class HTTPV1Module {}