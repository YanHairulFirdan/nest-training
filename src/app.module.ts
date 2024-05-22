import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma/extension';
import { ValidationRuleModule } from './validation-rule/validation-rule.module';
import { HTTPModule } from './http/controllers/v1/http.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
      isGlobal: true,
    }), 
    ValidationRuleModule,
    HTTPModule, 
  ],
})
export class AppModule {}
