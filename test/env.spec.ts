import { Env, Schema } from '../src';

describe('Env', () => {
  let writeSpy: jest.SpyInstance;

  beforeEach(() => {
    writeSpy = jest.spyOn(process.stdout, 'write');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
      },
    };

    // valid
    process.env['CAVIA_ENV'] = 'FoO';

    expect(() => Env.validate(schema))
      .not
      .toThrow();

    // invalid
    process.env['CAVIA_ENV'] = 'Foo';

    expect(() => Env.validate(schema))
      .toThrow('The process.env.CAVIA_ENV should match a regular expression /[A-Z]$/');

    // invalid
    process.env['CAVIA_ENV'] = 'foo';

    expect(() => Env.validate(schema))
      .toThrow('The process.env.CAVIA_ENV should match a regular expression /^[A-Z]/. The process.env.CAVIA_ENV should match a regular expression /[A-Z]$/.');
  });

  it('should validate the maxLength condition correctly', () => {
    const schema: Schema = {
      CAVIA_ENV: {
        maxLength: 10,
      },
    };

    // longer than maxLength
    process.env['CAVIA_ENV'] = 'HelloHelloHello';

    expect(() => Env.validate(schema))
      .toThrow('The process.env.CAVIA_ENV must be shorter than or equal to 10 characters');

    // equal to maxLength
    process.env['CAVIA_ENV'] = 'HelloHello';

    expect(() => Env.validate(schema))
      .not
      .toThrow();

    // shorter than maxLength
    process.env['CAVIA_ENV'] = 'Hello';

    expect(() => Env.validate(schema))
      .not
      .toThrow();
  });

  it('should validate the minLength condition correctly', () => {
    const schema: Schema = {
      CAVIA_ENV: {
        minLength: 10,
      },
    };

    // longer than minLength
    process.env['CAVIA_ENV'] = 'HelloHelloHello';

    expect(() => Env.validate(schema))
      .not
      .toThrow();

    // equal to minLength
    process.env['CAVIA_ENV'] = 'HelloHello';

    expect(() => Env.validate(schema))
      .not
      .toThrow();

    // shorter than minLength
    process.env['CAVIA_ENV'] = 'Hello';

    expect(() => Env.validate(schema))
      .toThrow('The process.env.CAVIA_ENV must be longer than or equal to 10 characters');
  });

  it('should validate the required condition correctly', () => {
    delete process.env['CAVIA_ENV'];

    // required: false (default)
    expect(() => Env.validate({ CAVIA_ENV: {} }))
      .not
      .toThrow();

    // required: false
    expect(() => Env.validate({ CAVIA_ENV: { required: false } }))
      .not
      .toThrow();

    // required: true
    expect(() => Env.validate({ CAVIA_ENV: { required: true } }))
      .toThrow('The process.env.CAVIA_ENV is required');
  });
});
