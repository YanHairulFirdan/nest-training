import { Global, Module } from '@nestjs/common';
import { ExistsRuleConstraint } from './rules/exists.rule';
import { UniqueRuleConstraint } from './rules/unique.rule';

@Global()
@Module({
  providers: [ExistsRuleConstraint, UniqueRuleConstraint],
  exports: [ExistsRuleConstraint, UniqueRuleConstraint],
})
export class ValidationRuleModule {}
