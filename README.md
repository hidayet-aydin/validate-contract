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

## License

MIT Licensed.

Copyright © Hidayet AYDIN 2022.
