const DEFAULT_REQUIRED: boolean = false;

function getSchemaRequired(schema: any): boolean {
  return schema.hasOwnProperty('required') ? schema.required : DEFAULT_REQUIRED;
}

export class Env {
  public static validate(schema: Schema): void | never {
    const errors: string[] = [];

    for (const [propertyName, propertySchema] of Object.entries(schema)) {
      const data: string | undefined = process.env[propertyName];
      const path: string = ['process', 'env', propertyName].join('.');

      if ((getSchemaRequired(propertySchema) === false && data === undefined)) {
        continue;
      }

      if (getSchemaRequired(propertySchema) === true && data === undefined) {
        errors.push(`The ${ path } is required`);
      }

      if (propertySchema.hasOwnProperty('expressions')) {
        for (const expression of propertySchema.expressions) {
          if (typeof data !== 'string' || expression.test(data) === false) {
            errors.push(`The ${ path } should match a regular expression ${ expression }`);
          }
        }
      }

      if (propertySchema.hasOwnProperty('maxLength') && (typeof data !== 'string' || data.length > propertySchema.maxLength)) {
        errors.push(`The ${ path } must be shorter than or equal to ${ propertySchema.maxLength } characters`);
      }

      if (propertySchema.hasOwnProperty('minLength') && (typeof data !== 'string' || data.length < propertySchema.minLength)) {
        errors.push(`The ${ path } must be longer than or equal to ${ propertySchema.minLength } characters`);
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join('\t'));
    }
  }
}

export interface Schema {
  [name: string]: {
    expressions?: RegExp[];
    maxLength?: number;
    minLength?: number;
    required?: boolean;
  };
}

