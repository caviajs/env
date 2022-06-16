<div align="center">
<h3>@caviajs/env</h3>
<p>a micro framework for node.js</p>
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

// ...
Env.validate({
  NODE_ENV: { enum: ['dev', 'prod', 'test'], required: true, type: 'enum' },
  APP_KEY: { required: true, type: 'string' },
});
```

<div align="center">
  <sub>Built with ❤︎ by <a href="https://partyka.dev">Paweł Partyka</a></sub>
</div>
