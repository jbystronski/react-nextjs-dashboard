import { React } from "react";
import { urlFromString } from "core/utils";
import { useFetch } from "core/hooks";
import TextInput from "core/ui/TextInput";
import { Stack, Box, Checkbox } from "@mui/material";
import Button from "core/ui/Button";
import Select from "core/ui/Select";

const Product = ({ data, handleSubmit, id, getError, isValid }) => {
  const { data: categories, error: categoriesError } = useFetch(
    `/api/db/find/categories?_sort.name=1&_only=name,_id`,

    { init: null }
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    const dataObject = {};

    for (let key of fd.keys()) {
      dataObject[key] = fd.get(key);
    }

    dataObject["price_w_tax"] =
      parseInt(fd.get("price_wo_tax")) +
      parseInt(fd.get("price_wo_tax")) * 0.23;

    dataObject["category_id"] = categories.filter(
      (c) => c.name === fd.get("category")
    )[0]["_id"];

    dataObject["published"] = fd.get("published") ? true : false;

    dataObject["url"] = urlFromString(fd.get("name"));

    handleSubmit(dataObject);
  };

  const styling = {
    sx: {
      mb: 2,
    },
  };

  const textInputs = [
    {
      value: "name",
      placeholder: "Product name",
      init: data.name,
    },
    {
      value: "description",
      placeholder: "Product description",
      minRows: 6,
      multiline: true,
      init: data.description,
    },
    {
      value: "in_stock",
      placeholder: "In stock",
      init: data.in_stock,
    },
    {
      value: "code",
      placeholder: "SKU",
      init: data.code,
    },
    {
      value: "priority",
      placeholder: "Priority",
      type: "number",
      init: data.priority,
    },
    {
      value: "price_wo_tax",
      placeholder: "Net price",
      init: data.price_wo_tax,
    },
  ];

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {textInputs.map(({ value, ...props }) => (
        <TextInput
          key={value}
          error={isValid(value)}
          helperText={getError(value)}
          name={value}
          {...props}
          {...styling}
        />
      ))}

      {categories && (
        <Select
          label="Category"
          init={data.category || categories[0].name}
          options={categories}
          displayProp="name"
          valueProp="name"
          emptyValue={null}
          name="category"
          {...styling}
        />
      )}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Checkbox
          name="published"
          label="Published"
          initial={data.published ? 1 : 0}
        />
        <Button label="Save" type="submit" />
      </Stack>
    </Box>
  );
};

export default Product;
