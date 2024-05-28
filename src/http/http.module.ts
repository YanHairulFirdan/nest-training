import { Module } from "@nestjs/common";
import { HTTPV1Module } from "src/http/v1/http.v1.module";

@Module({
    imports: [HTTPV1Module],
})
export class HTTPModule {}