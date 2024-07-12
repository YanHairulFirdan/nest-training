import { Module } from "@nestjs/common";
import PrismaModule from "./database/prisma/prisma.module";
import WinstonLoggerModule from "./logger/winston/winston.module";

@Module({
    imports: [
        PrismaModule,
        WinstonLoggerModule,
    ],
})
export class ProviderModule {}