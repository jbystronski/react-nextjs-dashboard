import { Avatar } from "core/ui/_libs";

export default function UiAvatar({
  path,
  fallback,
  size = [50, 50],

  styling,
  props
}) {
  return (
    <Avatar
      src={path ? path : undefined}
      sx={{
        width: size[0],
        height: size[1],
        bgcolor: "background.image",
        ...styling
      }}
      {...props}
    >
      {!path ? fallback : undefined}
    </Avatar>
  );
}
