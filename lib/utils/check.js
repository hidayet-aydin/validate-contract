import {
  isInteger,
  isLength,
  isEmail,
  isPassword,
  isMatch,
  isPhone,
} from "../adaptor/validator.js";

export default (row_pack) => {
  // filter optional parameters
  const optionals = row_pack
    .map((elm) => {
      return elm.type == "optional" ? elm.name : undefined;
    })
    .filter((x) => x !== undefined);

  const pack = row_pack.filter(
    (elm) => !(optionals.includes(elm.name) && elm.value == null)
  );

  const result = [];
  if (pack.length < 1) {
    return result;
  }
  let res = null;
  pack.forEach((elm) => {
    switch (elm["type"]) {
      case "integer":
        res = isInteger(elm["value"], elm["options"], elm["message"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "length":
        res = isLength(elm["value"], elm["options"], elm["message"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "email":
        res = isEmail(elm["value"], elm["options"], elm["message"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "password":
        const opt = elm["options"] || [];
        const options = [parseInt(opt[0]) || 4, parseInt(opt[1]) || 10];
        res = isLength(elm["value"], options, elm["message"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
          break;
        }
        res = isPassword(elm["value"], elm["options"], elm["message"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "match":
        if ("options" in elm) {
          const match_key = elm.options[0];
          pack.forEach((elm2) => {
            if (elm2["name"] == match_key) {
              res = isMatch(elm["value"], elm2["value"], elm["message"]);
              if (res) {
                res.name = elm["name"];
                result.push(res);
              }
            }
          });
        }
        break;
      case "phone":
        let locale = "any";
        if ("options" in elm) {
          locale = elm.options[0] || "any";
        }
        res = isPhone(elm["value"], locale, elm["message"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
    }
  });
  return result;
};
