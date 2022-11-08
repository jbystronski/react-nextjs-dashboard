import IconButton from "./IconButton";

import IconMapper from "./icons/IconMapper";

function LinkIconButton(props) {
  return (
    <IconButton {...props}>
      <IconMapper icon="follow_arrow" color="icons.primary" fontSize="small" />
    </IconButton>
  );
}

export default LinkIconButton;
