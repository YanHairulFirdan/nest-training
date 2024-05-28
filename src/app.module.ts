import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma/extension';
import { ValidationRuleModule } from './validation-rule/validation-rule.module';
import { HTTPModule } from './app/http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
      isGlobal: true,
    }), 
    AuthModule,
    ValidationRuleModule,
    HTTPModule, 
  ],
})
export class AppModule {}
