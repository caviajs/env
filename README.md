<div align="center">
<h3>@caviajs/env</h3>
<p>ecosystem for your guinea pig</p>
</div>

## Introduction

Environment variables are injected from outside-in to your application, 
and you have little or no control over them within your codebase,
so you should validate your environment variables.

## Usage

### Installation

```shell
npm install @caviajs/env --save
```

### Validating environment variables

```typescript
import { Env } from '@caviajs/env';

Env.validate({
  NODE_ENV: {
    expressions: [
      /^(dev|prod|test)$/,
    ],
    maxLength: 4,
    minLength: 1,
    required: true,
  },
  /* ... */
});
```

<div align="center">
  <sub>Built with ❤︎ by <a href="https://partyka.dev">Paweł Partyka</a></sub>
</div>
