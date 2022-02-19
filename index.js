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
        type: "length",
        name: index,
        options: ["0", "500"],
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

const isInteger = (value, opt = []) => {
  const options = { min: parseInt(opt[0]) || 0, max: parseInt(opt[1]) || 50 };
  return atomic_valiation(
    validator.isInt,
    `Invalid integer (length should be min ${options.min} and max ${options.max})!`,
    [value, options]
  );
};

const isLength = (value, opt = []) => {
  const options = { min: parseInt(opt[0]) || 0, max: parseInt(opt[1]) || 50 };
  return atomic_valiation(
    validator.isLength,
    `Length should be min ${options.min} and max ${options.max}`,
    [value, options]
  );
};

const isEmail = (value) => {
  return atomic_valiation(validator.isEmail, "Invalid email!", [value]);
};

const isPassword = (val, opt = []) => {
  const options = { min: parseInt(opt[0]) || 3 };
  const passwordRules = {
    minLength: options.min || 8, // 8
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

const isMatch = (value, comparison) => {
  return atomic_valiation(validator.equals, "Not Match!", [value, comparison]);
};

const isPhone = (value) => {
  return atomic_valiation(validator.isMobilePhone, "Invalid Phone Number!", [
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
        res = isInteger(elm["value"], elm["options"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "length":
        res = isLength(elm["value"], elm["options"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "email":
        res = isEmail(elm["value"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
        }
        break;
      case "password":
        res = isLength(elm["value"], elm["options"]);
        if (res) {
          res.name = elm["name"];
          result.push(res);
          break;
        }
        res = isPassword(elm["value"], elm["options"]);
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
