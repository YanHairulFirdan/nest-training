import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomPrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { extendedPrismaClient } from './prisma/extension';

@Module({
  imports: [CustomPrismaModule.forRootAsync({
    name: 'PrismaService',
    useFactory: () => {
      return extendedPrismaClient;
    }
  }), UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
