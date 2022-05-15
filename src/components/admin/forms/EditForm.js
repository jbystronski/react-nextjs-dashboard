import { useState, useEffect, React } from "react";
import ConfirmationDialog from "core/ui/ConfirmationDialog";

import { default as Product } from "./product/Main";
import { default as MailingList } from "./mailing_list/Index";
import { addProps } from "core/utils/addProps";

import { useFetch } from "core/hooks";
import { Box, Paper, Stack, Text } from "core/ui/_libs";
import { useValidation, useNotification } from "core/hooks";
import { getModelValidator, getModelEditableFields } from "lib/utils";

const EditForm = ({ model, id, ...props }) => {
  const { validate, getError, isValid } = useValidation(
    getModelValidator(model)
  );

  const info = useNotification();

  const [dialogOpen, setDialogOpen] = useState(false);

  const forms = {
    products: <Product />,
    mailing_lists: <MailingList />
  };

  const { data, error } = useFetch(`/api/db/find_one/${model}?_id=${id}`, {
    init: []
  });

  // const handleDelete = () => {
  //   deleteResource(id);
  //   router.push({
  //     pathname: `/admin/collections/[model]`,
  //     query: { model: page.model, page: 1, limit: 20 }
  //   });
  // };

  // const toolbarIcons = [
  //   {
  //     component: Link,
  //     icon: <TableViewIcon />,
  //     to: `/admin/table=${resource_name}/page=1/limit=20`
  //   },
  //   {
  //     component: Link,
  //     icon: <AddBoxIcon />,
  //     to: `/admin/create/resource=${resource_name}`
  //   },
  //   {
  //     onClick: () => setDialogOpen(!dialogOpen),
  //     icon: <DeleteSharpIcon />
  //   }
  // ];

  async function handleSubmit(data) {
    try {
      if (validate(data)) {
        process.env.db !== "no_persist" &&
          (await fetch(`/api/db/update_one/${model}`, {
            method: "PUT",
            body: JSON.stringify({
              _id: id,
              _set: data
            })
          }));

        info.set("Entry updated", "success");
      } else {
        info.set("You've got some errors in your form", "error");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {data ? (
        <>
          {/* <ConfirmationDialog
        title="Are you sure you want to delete this resource?"
        handleClick={handleDelete}
        open={dialogOpen}
        handleClose={() => setDialogOpen(!dialogOpen)}
      /> */}
          <Box component={Paper} sx={{ borderRadius: 2, width: 1, pb: 2 }}>
            <Stack spacing={2}>
              {Object.keys(data).length &&
                addProps(forms[model], {
                  _id: id,
                  data: data,
                  handleSubmit: handleSubmit,
                  getError: getError,
                  isValid: isValid
                })}
            </Stack>
          </Box>
          {info.component}
        </>
      ) : (
        <Text>Resource has been deleted or is not available</Text>
      )}
    </>
  );
};

export default EditForm;
