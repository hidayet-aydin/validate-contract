import { validate } from "../../index.js";

const payload = {
  user_name: "user",
  mail: "user@test",
  pass: "12a",
  passConfirm: "12a.",
  id_number: "123",
  cellPhone: "55511",
};

const contract = [
  {
    type: "length",
    name: "user_name",
    options: [5, 50],
    message: "Hatalı kullanıcı adı uzunluğu!",
  },
  {
    type: "length",
    name: "mail",
    options: [8, 50],
    message: "Hatalı mail uzunluğu!",
  },
  {
    type: "email",
    name: "mail",
    options: [],
    message: "Geçersiz mail!",
  },
  {
    type: "password",
    name: "pass",
    options: [4, 12],
    message: "Geçersiz şifre!",
  },
  {
    type: "match",
    name: "passConfirm",
    options: ["pass"],
    message: "Şifre uyuşmuyor!",
  },
  {
    type: "integer",
    name: "id_number",
    options: [1000, 20000],
    message: "Girilen sayı uygun aralıkta değildir!",
  },
  {
    type: "phone",
    name: "cellPhone",
    message: "Geçersiz telefon numarası!",
  },
];

const result = validate(contract, payload);

console.log(result);

/*
[
  { message: 'Hatalı kullanıcı adı uzunluğu!', name: 'user_name' },
  { message: 'Geçersiz mail!', name: 'mail' },
  { message: 'Geçersiz şifre!', name: 'pass' },
  { message: 'Şifre uyuşmuyor!', name: 'passConfirm' },
  {
    message: 'Girilen sayı uygun aralıkta değildir!',
    name: 'id_number'
  },
  { message: 'Geçersiz telefon numarası!', name: 'cellPhone' }
]
*/
