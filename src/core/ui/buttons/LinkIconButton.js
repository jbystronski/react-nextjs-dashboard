import { IconButton, IconMapper } from "core/ui";

function LinkIconButton(props) {
  return (
    <IconButton
      {...props}
      icon={
        <IconMapper
          icon="follow_arrow"
          color="icons.primary"
          fontSize="small"
        />
      }
    />
  );
}

export default LinkIconButton;
