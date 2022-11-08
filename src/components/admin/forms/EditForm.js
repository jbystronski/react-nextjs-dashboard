import React from "react";
import { default as Product } from "./product/Main";

import { addProps } from "core/utils/addProps";
import { useFetch } from "core/hooks";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useValidation, useNotification } from "core/hooks";
import { getModelValidator } from "lib/utils";

const EditForm = ({ model, id, ...props }) => {
  const { validate, getError, isValid } = useValidation(
    getModelValidator(model)
  );

  const info = useNotification();

  const { data, error } = useFetch(`/api/db/find_one/${model}?_id=${id}`, {
    init: [],
  });

  async function handleSubmit(data) {
    try {
      if (validate(data)) {
        process.env.db !== "no_persist" &&
          (await fetch(`/api/db/update_one/${model}`, {
            method: "PUT",
            body: JSON.stringify({
              _id: id,
              _set: data,
            }),
          }));

        info.set("Entry updated", "success");
      } else {
        info.set("You've got some errors in your form", "error");
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (!data)
    return (
      <Typography>Resource has been deleted or is not available</Typography>
    );

  return (
    <>
      <Box component={Paper} sx={{ borderRadius: 2, width: 1, pb: 2 }}>
        <Stack spacing={2}>
          {Object.keys(data).length && (
            <Product
              _id={id}
              data={data}
              getError={getError}
              handleSubmit={handleSubmit}
              isValid={isValid}
            />
          )}
        </Stack>
      </Box>
      {info.component}
    </>
  );
};

export default EditForm;
