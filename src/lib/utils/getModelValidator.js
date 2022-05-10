import * as schemas from "lib/configs/form_schemas";

export default function getModelValidator(model) {
  return schemas[model].validator;
}
