const submit = document.querySelector('button[name="submit"]');
const inputs = document.getElementsByTagName("input");
const inputList = Array.prototype.slice.call(inputs);

const ok_style = "color: black";
const error_style = "color: red";

const onChangeHandler = (event) => {
  const payload = {};
  inputList.forEach((elm) => {
    payload[elm.getAttribute("name")] = elm.value;
  });

  const result = validateContract.validation(schema, payload);

  console.log("res: ", result);

  const selected_name = event.path[0].name;
  const for_element = document.querySelector(
    'label[for="' + selected_name + '"]'
  );

  if (for_element) {
    for_element.innerHTML =
      for_element.getAttribute("default") || for_element.getAttribute("for");
    for_element.style = ok_style;
    event.target.setAttribute("valid", "true");
    result.forEach((elm) => {
      if (elm.name == selected_name) {
        for_element.innerHTML = elm.message;
        for_element.style = error_style;
        event.target.setAttribute("valid", "false");
      }
    });
  }
  submitIsVisible();
};

const submitIsVisible = () => {
  let results = [];
  inputList.forEach((elm) => {
    results.push(elm.getAttribute("valid"));
  });
  const result = !results.includes("false");
  submit.disabled = !result;
};

const onClickSubmit = () => {
  alert("ok!");
};

inputList.forEach((elm) => {
  elm.addEventListener("input", onChangeHandler);
});
submit.addEventListener("click", onClickSubmit);
