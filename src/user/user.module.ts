import { Module } from '@nestjs/common';
import UserService from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
          })
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
