import { ValidationOptions } from "class-validator";

export interface ExistRuleOptions extends ValidationOptions {
  table: string;
  column: string;
  attribute?: string;
  exceptionColumnName?: string;
  dtoPropertyException?: string;
}

export interface Result {
  target: any;
}