import Avatar from "@mui/material/Avatar";

export default function UiAvatar({
  path,
  fallback,
  size = [50, 50],
  styling,
  props,
}) {
  return (
    <Avatar
      src={path || undefined}
      sx={{
        width: size[0],
        height: size[1],
        bgcolor: "background.image",
        ...styling,
      }}
      {...props}
    >
      {!path ? fallback : undefined}
    </Avatar>
  );
}
