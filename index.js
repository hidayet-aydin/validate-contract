import validator from "validator";

const SchemaObj = function (form_schema, form_params) {
  this.result = form_schema || [];
  if (form_schema) {
    this.result.forEach((elm) => {
      if (elm["name"] in form_params) {
        elm.value = form_params[elm["name"]];
      } else {
        elm.value = "";
      }
    });
  } else {
    for (let index in form_params) {
      this.result.push({
        name: index,
        type: "",
        min: 0,
        max: 500,
        match: "",
        value: form_params[index],
      });
    }
  }
};

const atomic_valiation = (method, message, val) => {
  try {
    const res = method(...val);
    if (!res) {
      return { message };
    }
    return;
  } catch (error) {
    return { message: error.message };
  }
};

const isLength = (value, min = 0, max = 500) => {
  const options = { min, max };
  return atomic_valiation(
    validator.isLength,
    `Length should be min ${min} and max ${max}`,
    [value, options]
  );
};

const isEmail = (value) => {
  return atomic_valiation(validator.isEmail, "Invalid email!", [value]);
};

const isPassword = (val, min) => {
  const passwordRules = {
    minLength: min || 8, // 8
    minLowercase: 1,
    minUppercase: 0, // 1
    minNumbers: 1,
    minSymbols: 0, // 1
    returnScore: false,
    pointsPerUnique: 0, // 1
    pointsPerRepeat: 0, // 0.5
    pointsForContainingLower: 0, // 10
    pointsForContainingUpper: 0, // 10
    pointsForContainingNumber: 0, // 10
    pointsForContainingSymbol: 0, // 10
  };
  return atomic_valiation(validator.isStrongPassword, "Invalid password!", [
    val,
    passwordRules,
  ]);
};

const isNumeric = (value) => {
  return atomic_valiation(validator.isNumeric, "Invalid number!", [value]);
};

const isInteger = (value, min = 0, max = 500) => {
  return atomic_valiation(
    validator.isInt,
    `Invalid integer (length should be min ${min} and max ${max})!`,
    [value, { min, max }]
  );
};

const isMatch = (value, comparison) => {
  return atomic_valiation(validator.equals, "Not Match!", [value, comparison]);
};

const isPhone = (value) => {
  return atomic_valiation(validator.isMobilePhone, "Not Phone!", [
    value,
    "any",
    { strictMode: false },
  ]);
};

const check = (pack) => {
  const result = [];
  if (pack.length < 1) {
    return result;
  }
  let res = null;
  pack.forEach((elm) => {
    switch (elm["type"]) {
      case "integer":
        res = isInteger(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "string":
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "email":
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        res = isEmail(elm["value"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "password":
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        res = isPassword(elm["value"], elm["min"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "match":
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        if ("options" in elm) {
          const match_key = elm.options[0];
          pack.forEach((elm2) => {
            if (elm2["name"] == match_key) {
              res = isMatch(elm["value"], elm2["value"]);
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
        res = isPhone(elm["value"], locale);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
    }
  });
  return result;
};

// console.log("isEmail: ", isEmail("user@test.com"));
// console.log("isLength: ", isLength("user@test.com", 10, 25));
// console.log("isPassword: ", isPassword("12a", 3));
// console.log("isNumeric: ", isNumeric("12,8"));
// console.log("isMatch: ", isMatch("abc", "abcd"));
// console.log("isInteger: ", isInteger("80"));
// console.log("isPhone: ", isPhone("+905551234567", "any"));

const validation = (form_schema, payload) => {
  if (!Array.isArray(form_schema)) {
    return [];
  }
  if (!(typeof payload === "object" && !Array.isArray(payload))) {
    return [];
  }
  const merged_schema = new SchemaObj(form_schema, payload);
  return check(merged_schema.result);
};

export { validation };
