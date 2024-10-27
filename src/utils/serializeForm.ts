const serializeForm = <T extends {}>(form: HTMLFormElement): T => {
  const formData = new FormData(form);
  const object: { [x: string]: any } = {};

  formData.forEach((value, key) => {
    if (value !== "") {
      if (!Reflect.has(object, key)) {
        object[key] = value;
        return;
      }
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      object[key].push(value);
    }
  });

  return object as T;
};

export default serializeForm;
