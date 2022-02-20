import validator from "validator";

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

export const isInteger = (value, opt = [], msg) => {
  const options = { min: parseInt(opt[0]) || 0, max: parseInt(opt[1]) || 500 };
  const message =
    msg ||
    `Invalid integer (length should be min ${options.min} and max ${options.max})!`;
  return atomic_valiation(validator.isInt, message, [value, options]);
};

export const isLength = (value, opt = [], msg) => {
  const options = { min: parseInt(opt[0]) || 0, max: parseInt(opt[1]) || 500 };
  const message =
    msg || `Length should be min ${options.min} and max ${options.max}`;
  return atomic_valiation(validator.isLength, message, [value, options]);
};

export const isEmail = (value, opt = [], msg) => {
  const message = msg || "Invalid email!";
  return atomic_valiation(validator.isEmail, message, [value]);
};

export const isPassword = (val, opt = [], msg) => {
  const message = msg || "Invalid password!";
  const passwordRules = {
    minLength: parseInt(opt[0]) || 4,
    minLowercase: parseInt(opt[2]) || 0,
    minUppercase: parseInt(opt[3]) || 0, // 1
    minNumbers: parseInt(opt[4]) || 1,
    minSymbols: 0, // 1
    returnScore: false,
    pointsPerUnique: 0, // 1
    pointsPerRepeat: 0, // 0.5
    pointsForContainingLower: 0, // 10
    pointsForContainingUpper: 0, // 10
    pointsForContainingNumber: 0, // 10
    pointsForContainingSymbol: 0, // 10
  };
  return atomic_valiation(validator.isStrongPassword, message, [
    val,
    passwordRules,
  ]);
};

export const isNumeric = (value, opt = [], msg) => {
  const message = msg || "Invalid number!";
  return atomic_valiation(validator.isNumeric, "Invalid number!", [value]);
};

export const isMatch = (value, comparison, msg) => {
  const message = msg || "Not Match!";
  return atomic_valiation(validator.equals, message, [value, comparison]);
};

export const isPhone = (value, opt = [], msg) => {
  const message = msg || "Invalid Phone Number!";
  return atomic_valiation(validator.isMobilePhone, message, [
    value,
    "any",
    { strictMode: false },
  ]);
};
