import { Env, Schema } from '../src';

describe('SchemaString', () => {
  afterAll(() => {
    delete process.env['CAVIA_ENV'];
  });

  it('should validate the expressions condition correctly', () => {
    const schema: Schema = {
      CAVIA_ENV: {
        expressions: [
          /^[A-Z]/,
          /[A-Z]$/,
        ],
        type: 'string',
      },
    };

    // valid
    process.env['CAVIA_ENV'] = 'FoO';

    expect(Env.validate(schema)).toEqual([]);

    // invalid
    process.env['CAVIA_ENV'] = 'Foo';

    expect(Env.validate(schema)).toEqual([
      { message: 'The value should match a regular expression /[A-Z]$/', path: 'process.env.CAVIA_ENV' },
    ]);

    // invalid
    process.env['CAVIA_ENV'] = 'foo';

    expect(Env.validate(schema)).toEqual([
      { message: 'The value should match a regular expression /^[A-Z]/', path: 'process.env.CAVIA_ENV' },
      { message: 'The value should match a regular expression /[A-Z]$/', path: 'process.env.CAVIA_ENV' },
    ]);
  });

  it('should validate the maxLength condition correctly', () => {
    const schema: Schema = {
      CAVIA_ENV: {
        maxLength: 10,
        type: 'string',
      },
    };

    // longer than maxLength
    process.env['CAVIA_ENV'] = 'HelloHelloHello';

    expect(Env.validate(schema)).toEqual([
      { message: 'The value must be shorter than or equal to 10 characters', path: '' },
    ]);

    // equal to maxLength
    process.env['CAVIA_ENV'] = 'HelloHello';

    expect(Env.validate(schema)).toEqual([]);

    // shorter than maxLength
    process.env['CAVIA_ENV'] = 'Hello';

    expect(Env.validate(schema)).toEqual([]);
  });

  it('should validate the minLength condition correctly', () => {
    const schema: Schema = {
      CAVIA_ENV: {
        minLength: 10,
        type: 'string',
      },
    };

    // longer than minLength
    process.env['CAVIA_ENV'] = 'HelloHelloHello';

    expect(Env.validate(schema)).toEqual([]);

    // equal to minLength
    process.env['CAVIA_ENV'] = 'HelloHello';

    expect(Env.validate(schema)).toEqual([]);

    // shorter than minLength
    process.env['CAVIA_ENV'] = 'Hello';

    expect(Env.validate(schema)).toEqual([
      { message: 'The value must be longer than or equal to 10 characters', path: '' },
    ]);
  });

  it('should validate the nullable condition correctly', () => {
    // nullable: false (default)
    expect(validateSchemaString({ type: 'string' }, null)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // nullable: false
    expect(validateSchemaString({ nullable: false, type: 'string' }, null)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // nullable: true
    expect(validateSchemaString({ nullable: true, type: 'string' }, null)).toEqual([]);
  });

  it('should validate the required condition correctly', () => {
    // required: false (default)
    expect(validateSchemaString({ type: 'string' }, undefined)).toEqual([]);

    // required: false
    expect(validateSchemaString({ required: false, type: 'string' }, undefined)).toEqual([]);

    // required: true
    expect(validateSchemaString({ required: true, type: 'string' }, undefined)).toEqual([
      { message: 'The value is required', path: '' },
      { message: 'The value should be string', path: '' },
    ]);
  });

  it('should validate the type condition correctly', () => {
    const schema: SchemaString = {
      nullable: false,
      required: true,
      type: 'string',
    };

    // string
    expect(validateSchemaString(schema, 'Hello World')).toEqual([]);

    // number
    expect(validateSchemaString(schema, 1245)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // true
    expect(validateSchemaString(schema, true)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // false
    expect(validateSchemaString(schema, false)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // buffer
    expect(validateSchemaString(schema, Buffer.from('Hello World'))).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // undefined
    expect(validateSchemaString(schema, undefined)).toEqual([
      { message: 'The value is required', path: '' },
      { message: 'The value should be string', path: '' },
    ]);

    // symbol
    expect(validateSchemaString(schema, Symbol('Hello World'))).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // null
    expect(validateSchemaString(schema, null)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // NaN
    expect(validateSchemaString(schema, NaN)).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // array
    expect(validateSchemaString(schema, [])).toEqual([
      { message: 'The value should be string', path: '' },
    ]);

    // object
    expect(validateSchemaString(schema, {})).toEqual([
      { message: 'The value should be string', path: '' },
    ]);
  });
});
