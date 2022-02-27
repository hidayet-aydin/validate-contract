# validate-contract

JSON schema validator for the server and client sides.

## 1. INSTALLATION

Install the library with `npm i validate-contract`

## 2. TYPES OF USAGE

This library supports server and client side usage.

### 2.1. ECMAScript (ES) Module Usage

```js
import { validate } from "validate-contract";

const register = {
  user_mail: "user@test",
  pwd: "12",
};

const contract = [
  { type: "length", name: "user_mail", options: [10, 50] },
  { type: "email", name: "user_mail" },
  { type: "password", name: "pwd", options: [3, 12] },
];

const result = validate(contract, register);
console.log(result);
```

**console.log**

```
[
  { message: 'Length should be min 10 and max 50', name: 'user_mail' },
  { message: 'Invalid email!', name: 'user_mail' },
  { message: 'Length should be min 3 and max 12', name: 'pwd' }
]
```

### 2.2. Server Side Usage

`validate-contract` is a set of `express.js` middlewares that wraps `validator.js` validator functions.

- req.body
- req.cookies
- req.headers
- req.params
- req.query

```js
import { middleware } from "validate-contract";
const { body, cookies, headers, params, query } = middleware;
```

**Middleware Using Example**

```js
import express from "express";
import { middleware } from "validate-contract";

const app = express();
const { body } = middleware;

app.use(express.json());

const contract = [
  { type: "email", name: "email" },
  { type: "password", name: "password" },
];

app.use(body(contract));

app.use("/", (req, res, next) => {
  if (req.validationCheck) {
    console.log(req.validationResult);
    return res.status(400).json({ message: req.validationResult });
  }
  res.status(200).json("Ok!");
});

app.listen(3000, () => {
  console.log("Server is running!");
});
```

### 2.3. Browser Side Usage

You can also insert the `CDN` link in the field at the bottom for javascript.

```html
<script src="https://unpkg.com/validate-contract@latest/validateContract.min.js"></script>
```

---

```html
<!-- CDN -->
<script src="https://unpkg.com/validate-contract@latest/validateContract.min.js"></script>
<!-- Standalone Script -->
<script type="text/javascript" src="validateContract.min.js"></script>

<script type="text/javascript">
  const login = {
    email: "user@test",
    password: "12",
  };

  const contract = [
    { type: "email", name: "email" },
    { type: "password", name: "password" },
  ];

  const result = validateContract.validate(contract, login);
  console.log(result);
</script>
```

**console.log**

```
[
  { message: 'Invalid email!', name: 'email' },
  { message: 'Length should be min 4 and max 10', name: 'password' }
]
```

## 3. LIST OF THE VALIDATION TYPES

```js
{
  type: "integer",               // mandatory field for validation type
  name: "day",                   // mandatory field for validation parameter
  options: [1, 31],              // optional field for additional validation features
  message: "Invalid Day Length!" // optional field for custom message
}
```

| Types of Validation | Description                                                                                                                                                                                       |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `integer`           | **Used for integer type and length**<br>The first argument of the options is for `min` and the second argument is for `max`.<br>Default options, `options: [0, 500]`                              |
| `length`            | **Used for text length**<br>The first argument of the options is for `min` and the second argument is for `max`.<br>Default options, `options: [0, 500]`                                          |
| `email`             | **Used for valid email type**                                                                                                                                                                     |
| `password`          | **Used for complex password type and length**<br>the arguments are as follows => `[minLength, maxLength, minLowerCase, minUpperCase, minNumber]`.<br>Default options, `options: [4, 10, 0, 0, 1]` |
| `phone`             | **Used for phone number type**                                                                                                                                                                    |
| `match`             | **Checks whether it has the same value as another parameter in the same payload.**                                                                                                                |
| `optional`          | **Checks whether it can take an empty value.**                                                                                                                                                    |

Don't be surprised if other types are added soon :wink:

---

## LICENSE

MIT Licensed.

Copyright © Hidayet AYDIN 2022.
