import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { extendedPrismaClient } from './prisma/extension';
import { V1Module } from './http/controllers/v1/v1.module';
import { RouterModule } from '@nestjs/core';
import { ValidationRuleModule } from './validation-rule/validation-rule.module';

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
    V1Module,
    RouterModule.register([
      {
        path: 'api/v1',
        module: V1Module,
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
