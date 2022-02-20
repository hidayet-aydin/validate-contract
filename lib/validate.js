import Mergerer from "./utils/Mergerer.js";
import check from "./utils/check.js";

const validate = (form_schema, payload) => {
  if (!Array.isArray(form_schema)) {
    return [];
  }
  if (!(typeof payload === "object" && !Array.isArray(payload))) {
    return [];
  }
  const merged_schema = new Mergerer(form_schema, payload);
  return check(merged_schema.result);
};

export default validate;
