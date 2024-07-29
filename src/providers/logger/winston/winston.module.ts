import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      handleExceptions: true,
      transports: [
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: '%DATE%-error.log',
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d',
        }),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: '%DATE%-combined.log',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d',
        }),
      ],
    }),
  ],
})
export default class WinstonLoggerModule {}
