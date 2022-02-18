import { validation } from "../../index.js";

const payload = {
  user_name: "a user",
  mail: "user@test.com",
  pass: "12a",
  passConfirm: "12a",
  id_number: "12345",
  cellPhone: "5551112233",
};

const schema = [
  {
    type: "string",
    name: "user_name",
    min: 5,
    max: 50,
    options: [],
  },
  {
    type: "email",
    name: "mail",
    min: 8,
    max: 50,
    options: [],
  },
  {
    type: "password",
    name: "pass",
    min: 3,
    max: 12,
    options: [],
  },
  {
    type: "match",
    name: "passConfirm",
    min: 3,
    max: 12,
    options: ["pass"],
  },
  {
    type: "integer",
    name: "id_number",
    min: 0,
    max: 20000,
    options: ["pass"],
  },
  {
    type: "phone",
    name: "cellPhone",
    min: 0,
    max: 0,
  },
];

const result = validation(schema, payload);

console.log(result);
