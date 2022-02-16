import { validation } from "./index";

const register_test = async () => {
  const payload = {
    register: {
      uname: "user",
      email: "user@test.com",
      password: "12a",
    },
  };
  const form_name = Object.keys(payload)[0];
  const form_schema = [
    { name: "email", type: "email", min: 8, max: 50, match: "" },
    { name: "password", type: "password", min: 3, max: 12, match: "" },
  ];
  const res = validation(form_schema, payload[form_name]);
  console.log(res);
};

await register_test();
