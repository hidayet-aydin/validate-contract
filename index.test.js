import { validation } from "./index.js";

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
