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
    type: "length",
    name: "user_name",
    options: ["5", "50"],
  },
  {
    type: "length",
    name: "mail",
    options: ["8", "50"],
  },
  {
    type: "email",
    name: "mail",
    options: [],
  },
  {
    type: "password",
    name: "pass",
    options: ["3", "12"],
  },
  {
    type: "match",
    name: "passConfirm",
    options: ["pass"],
  },
  {
    type: "integer",
    name: "id_number",
    options: ["1000", "20000"],
  },
  {
    type: "phone",
    name: "cellPhone",
  },
];

const result = validation(schema, payload);

console.log(result);
