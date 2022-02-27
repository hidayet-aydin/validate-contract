class Merger {
  constructor(form_schema, form_params) {
    this.result = form_schema || [];
    if (form_schema) {
      this.result.forEach((elm) => {
        if (elm["name"] in form_params) {
          elm.value = form_params[elm["name"]];
        } else {
          elm.value = null;
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
  }
}

export default Merger;
