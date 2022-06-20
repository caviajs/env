<div align="center">
<h3>@caviajs/env</h3>
<p>ecosystem for your guinea pig</p>
</div>

<div align="center">
<h4>Installation</h4>
</div>

```shell
npm install @caviajs/env --save
```

<div align="center">
<h4>Usage</h4>
</div>

```typescript
import { Env } from '@caviajs/env';

Env.validate({
  NODE_ENV: {
    expressions: [/^(dev|prod|test)$/],
    maxLength: 4,
    minLength: 1,
    required: true,
  },
  // ...
});
```

<div align="center">
  <sub>Built with ❤︎ by <a href="https://partyka.dev">Paweł Partyka</a></sub>
</div>
