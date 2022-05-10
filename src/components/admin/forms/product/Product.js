import { React } from "react";
import { urlFromString } from "core/utils";

import { getToday } from "core/utils/dateHelpers";

import { useFetch, useValidation } from "core/hooks";
import { Select, Checkbox, TextInput, UiButton } from "core/ui";

import { Stack, Box } from "core/ui/_libs";

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
      mb: 2
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TextInput
        error={isValid("name")}
        helperText={getError("name")}
        name="name"
        init={data.name}
        placeholder="Product name"
        {...styling}
      />
      <TextInput
        error={isValid("description")}
        helperText={getError("description")}
        name="description"
        placeholder="Product description"
        multiline={true}
        minRows={6}
        init={data.description}
        {...styling}
      />
      <TextInput
        error={isValid("in_stock")}
        helperText={getError("in_stock")}
        name="in_stock"
        init={data.in_stock}
        placeholder="In stock"
        {...styling}
      />
      <TextInput
        error={isValid("code")}
        helperText={getError("code")}
        name="code"
        init={data.code}
        placeholder="SKU"
        {...styling}
      />

      <TextInput
        error={isValid("priority")}
        helperText={getError("priority")}
        name="priority"
        placeholder="Priority"
        type="number"
        init={data.priority}
        {...styling}
      />
      <TextInput
        error={isValid("price_wo_tax")}
        helperText={getError("price_wo_tax")}
        name="price_wo_tax"
        init={data.price_wo_tax}
        placeholder="Net price"
        {...styling}
      />
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
        <UiButton label="Save" type="submit" />
      </Stack>
    </Box>
  );
};

export default Product;
