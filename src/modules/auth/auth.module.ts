import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from './guards/auth.guard';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
