import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class HTTPV1Module {}