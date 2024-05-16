import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma/extension';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
