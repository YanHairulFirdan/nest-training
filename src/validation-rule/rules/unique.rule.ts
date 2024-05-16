import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ExistRuleOptions, Result } from '../interfaces';
import { ExtendedPrismaClient } from 'src/prisma/extension';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueRuleConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>
  ) {
    console.log('constructor UniqueRuleConstraint');
  }

  async validate(value: any, args: ValidationArguments) {
    const [
      column,
      table,
      attribute,
      exceptionColumnName,
      dtoPropertyException,
    ] = args.constraints;

    let query = `SELECT ${column} as target FROM ${table} WHERE ${column} = '${value}'`;

    if (dtoPropertyException  && exceptionColumnName) {
      const exceptionValue = args.object[dtoPropertyException];

      query = query.concat(` AND ${exceptionColumnName} != '${exceptionValue}'`);
    }

    const res = await this.prisma.client.$queryRawUnsafe<Result[]>(query);

    return res.length === 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [column, table, attribute] = validationArguments.constraints;

    return `${attribute} with ${column} $value already exists.`;
  }
}

export function Unique(validationOptions?: ExistRuleOptions) {
  return function (object: any, propertyName: string) {  
    const validator = UniqueRuleConstraint;
    
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        validationOptions.column,
        validationOptions.table,
        validationOptions.attribute,
        validationOptions.exceptionColumnName,
        validationOptions.dtoPropertyException,
      ],
      validator,
    });
  };
}
