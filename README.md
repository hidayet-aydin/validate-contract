# validate-contract

JSON schema validator for the server and client sides.

## Installation

Install the library with `npm i validate-contract`

## ECMAScript (ES) Module Usage

```js
import { validation } from "validate-contract";

const payload = {
  user_mail: "user@test",
  pwd: "12",
};

const schema = [
  { type: "email", name: "user_mail", min: 8, max: 50 },
  { type: "password", name: "pwd", min: 3, max: 12 },
];

const result = validation(schema, payload);

console.log(result);
```

**console output**

```
[
  { message: 'Invalid email!', name: 'user_mail' },
  { message: 'Invalid password!', name: 'pwd' },
  { message: 'Length should be min 3 and max 12', name: 'pwd' }
]
```

## Browser (Client-Side) Usage

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
    { type: "email", name: "email", min: 8, max: 50 },
    { type: "password", name: "password", min: 3, max: 12 },
  ];

  const result = validateContract.validation(schema, payload);

  console.log(result);
</script>
```

## List Of The Validation Types

- integer
- string
- email
- password
- match
- phone

## License

MIT Licensed.

Copyright © Hidayet AYDIN 2022.
