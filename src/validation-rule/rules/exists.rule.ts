import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ExistRuleOptions, Result } from '../interfaces';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/providers/database/prisma/extenstions/extension';

@Injectable()
@ValidatorConstraint({ name: 'exists' })
export class ExistsRuleConstraint implements ValidatorConstraintInterface {
  
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const [column, table] = args.constraints;
    console.log(value, args);

    const query = `SELECT ${column} as target FROM ${table} WHERE ${column} = ${value} LIMIT 1`;

    const res = await this.prisma.client.$queryRawUnsafe<Result[]>(query);

    return res.length > 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [column, table, attribute] = validationArguments.constraints;

    return `${attribute} with ${column} $value not found.`;
  }
}

export function Exists(validationOptions?: ExistRuleOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        validationOptions.column,
        validationOptions.table,
        validationOptions.attribute,
      ],
      validator: ExistsRuleConstraint,
    });
  };
}
