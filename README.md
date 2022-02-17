# validate-contract

JSON schema validator for the server and client sides.

## Installation

Install the library with `npm i validate-contract`

## Server-side Usage

```js
import { validation } from "validate-contract";

const payload = {
  email: "user@test",
  password: "12",
};

const schema = [
  { name: "email", type: "email", min: 8, max: 50 },
  { name: "password", type: "password", min: 3, max: 12 },
];

const result = validation(schema, payload);

console.log(result);
```

**console**

```
[
  { message: 'Invalid email!', param: 'email' },
  { message: 'Invalid password!', param: 'password' },
  { message: 'Length should be min 3 and max 12', param: 'password' }
]
```

## Client-side Usage

```html
<!-- CDN -->
<script src="https://unpkg.com/validate-contract@latest/validateContract.min.js"></script>
<!-- Standalone Script -->
<script type="text/javascript" src="validateContract.min.js"></script>

<script type="text/javascript">
  const payload = {
    email: "user@test",
    password: "12",
  };

  const schema = [
    { name: "email", type: "email", min: 8, max: 50 },
    { name: "password", type: "password", min: 3, max: 12 },
  ];

  const result = validateContract.validation(schema, payload);

  console.log(result);
</script>
```

## License

MIT Licensed.

Copyright © Hidayet AYDIN 2022.
