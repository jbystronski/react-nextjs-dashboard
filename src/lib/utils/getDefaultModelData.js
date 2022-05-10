import * as schemas from "lib/configs/form_schemas";

export default function getDefaultModelData(model) {
  return schemas[model].properties;
}
