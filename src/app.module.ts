import { Module } from '@nestjs/common';
import { ValidationRuleModule } from './validation-rule/validation-rule.module';
import { HTTPModule } from './app/http/http.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProviderModule } from './providers/provider.module';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config';

@Module({
  imports: [
    ProviderModule,
    AuthModule,
    ValidationRuleModule,
    HTTPModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
  ],
})
export class AppModule {}
