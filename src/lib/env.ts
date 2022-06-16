import { ValidationError } from './types/validation-error';
import { isSchemaBoolean } from './utils/is-schema-boolean';
import { validateSchemaBoolean } from './utils/validate-schema-boolean';
import { isSchemaEnum } from './utils/is-schema-enum';
import { validateSchemaEnum } from './utils/validate-schema-enum';
import { isSchemaNumber } from './utils/is-schema-number';
import { isSchemaString } from './utils/is-schema-string';
import { validateSchemaNumber } from './utils/validate-schema-number';
import { validateSchemaString } from './utils/validate-schema-string';
import { SchemaBoolean } from './types/schema-boolean';
import { SchemaEnum } from './types/schema-enum';
import { SchemaNumber } from './types/schema-number';
import { SchemaString } from './types/schema-string';

export class Env {
  public static validate(schema: Schema): void | never {
    const errors: ValidationError[] = [];

    for (const [key, value] of Object.entries(schema)) {
      if (isSchemaBoolean(value)) {
        errors.push(...validateSchemaBoolean(value, process.env[key], ['process', 'env', key]));
      } else if (isSchemaEnum(value)) {
        errors.push(...validateSchemaEnum(value, process.env[key], ['process', 'env', key]));
      } else if (isSchemaNumber(value)) {
        errors.push(...validateSchemaNumber(value, process.env[key], ['process', 'env', key]));
      } else if (isSchemaString(value)) {
        errors.push(...validateSchemaString(value, process.env[key], ['process', 'env', key]));
      } else {
        throw new Error('Invalid schema');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
  }
}

export interface Schema {
  [name: string]: SchemaBoolean | SchemaEnum | SchemaNumber | SchemaString;
}

