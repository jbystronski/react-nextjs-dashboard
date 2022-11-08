import { Paper, Box, Stack } from "@mui/material";

import { addProps } from "core/utils/addProps";
import { getToday } from "core/utils/dateHelpers";
import { getDefaultModelData, getModelValidator } from "lib/utils";

import { useValidation, useNotification } from "core/hooks";

import dynamic from "next/dynamic";

const Product = dynamic(() => import("./product/Main"));
const MailingList = dynamic(() => import("./mailing_list/Index"));

const CreateForm = ({ model }) => {
  const { validate, getError, isValid } = useValidation(
    getModelValidator(model)
  );

  const info = useNotification();

  const forms = {
    products: <Product />,
    mailing_lists: <MailingList />,
  };

  const handleSubmit = async (data) => {
    try {
      if (validate(data)) {
        process.env.db !== "no_persist" &&
          (await fetch(`/api/db/save_one/${model}`, {
            method: "POST",
            body: JSON.stringify({
              _save: {
                ...getDefaultModelData(model),
                ...data,
                created_at: getToday(),
                updated_at: getToday(),
              },
            }),
          }));
        info.set("New entry created", "success");
      } else {
        info.set("You've got some errors in your form", "error");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box component={Paper} sx={{ borderRadius: 2, width: 1, pb: 2 }}>
      <Stack spacing={2}>
        {addProps(forms[model], {
          handleSubmit,
          data: getDefaultModelData(model),
          id: "id",
          getError,
          isValid,
        })}
      </Stack>
      {info.component}
    </Box>
  );
};

export default CreateForm;
