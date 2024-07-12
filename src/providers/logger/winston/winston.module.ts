import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            handleExceptions: true,
            transports: [
                new winston.transports.Console(),
            ],
        }),
    ],
})
export default class WinstonLoggerModule {}