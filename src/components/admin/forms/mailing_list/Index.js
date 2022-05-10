import { React } from "react";

import { TextInput, Checkbox } from "core/ui";

import { Button, Box } from "core/ui/_libs";

const Index = ({ data, handleSubmit, id }) => {
  const handleFormSubmit = () => {
    return null;
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextInput key={id + 0} name="name" init={data.name} />
        <TextInput
          key={id + 1}
          name="description"
          init={data.description}
          multiline={true}
          minRows={6}
        />
        <Checkbox
          key={id + 2}
          name="active"
          label="Active"
          init={data.active}
        />

        <Button type="submit">Submit</Button>
      </Box>
    </>
  );
};

export default Index;
