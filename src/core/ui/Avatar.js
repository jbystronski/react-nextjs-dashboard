import { default as A } from "@mui/material/Avatar";

export default function Avatar({
  path,
  fallback,
  size = [50, 50],

  styling,
  props,
}) {
  return (
    <A
      src={path ? path : undefined}
      sx={{
        width: size[0],
        height: size[1],
        bgcolor: "background.image",
        ...styling,
      }}
      {...props}
    >
      {!path ? fallback : undefined}
    </A>
  );
}
