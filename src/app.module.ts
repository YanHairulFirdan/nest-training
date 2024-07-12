import { Module } from '@nestjs/common';
import { ValidationRuleModule } from './validation-rule/validation-rule.module';
import { HTTPModule } from './app/http/http.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProviderModule } from './providers/provider.module';

@Module({
  imports: [
    ProviderModule,
    AuthModule,
    ValidationRuleModule,
    HTTPModule, 
  ],
})
export class AppModule {}
