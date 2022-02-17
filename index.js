import validator from "validator";

const SchemaObj = function (form_schema, form_params) {
  this.result = form_schema || [];
  if (form_schema) {
    this.result.forEach((elm) => {
      elm.value = form_params[elm["name"]];
    });
  } else {
    this.result = [];
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

const isEmail = (value) => {
  return atomic_valiation(validator.isEmail, "Invalid email!", [value]);
};

const isNumeric = (value) => {
  return atomic_valiation(validator.isNumeric, "Invalid number!", [value]);
};

const isLength = (value, min = 0, max = 250) => {
  const options = { min, max };
  return atomic_valiation(
    validator.isLength,
    `Length should be min ${min} and max ${max}`,
    [value, options]
  );
};

const isStrongPassword = (val, min) => {
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

const check = (pack) => {
  const result = [];
  if (pack.length < 1) {
    return result;
  }
  let res = null;
  pack.forEach((elm) => {
    switch (elm["type"]) {
      case "string":
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.param = elm["name"];
          result.push(res);
        }
        break;
      case "email":
        res = isEmail(elm["value"]);
        if (res) {
          res.param = elm["name"];
          result.push(res);
        }
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.param = elm["name"];
          result.push(res);
        }
        break;
      case "password":
        res = isStrongPassword(elm["value"], elm["min"]);
        if (res) {
          res.param = elm["name"];
          result.push(res);
        }
        res = isLength(elm["value"], elm["min"], elm["max"]);
        if (res) {
          res.param = elm["name"];
          result.push(res);
        }
        break;
    }
  });
  return result;
};

// console.log("isEmail: ", isEmail("user@test.com"));
// console.log("isLength: ", isLength("user@test.com", 10, 25));
// console.log("isStrongPassword: ", isStrongPassword("12a", 3));
// console.log("isNumeric: ", isNumeric("12,8"));

const validation = (form_schema, payload) => {
  const merged_schema = new SchemaObj(form_schema, payload);
  return check(merged_schema.result);
};

export { validation };
