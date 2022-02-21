import validate from "./validate.js";

const core = (select, contract) => {
  return (req, res, next) => {
    try {
      const payload = req[select];
      const validation = validate(contract, payload);
      req.validationCheck = validation.length > 0 ? true : false;
      req.validationResult = validation;
      next();
    } catch (error) {
      req.validationCheck = true;
      req.validationResult = [{ message: error.message }];
      next(error);
    }
  };
};

const body = (contract) => {
  return core("body", contract);
};

const cookies = (contract) => {
  return core("cookies", contract);
};

const headers = (contract) => {
  return core("headers", contract);
};

const params = (contract) => {
  return core("params", contract);
};

const query = (contract) => {
  return core("query", contract);
};

export default {
  body,
  cookies,
  headers,
  params,
  query,
};
