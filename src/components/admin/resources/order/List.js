import {
  Typography,
  List as UiList,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

export default function List({ items, header, icon }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.dark",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 1 }} variant="caption">
          {header}
        </Typography>
        {icon}
      </Box>

      <UiList dense disablePadding sx={{ mb: 3, mt: 2 }}>
        {items.map((val, i) => (
          <ListItem key={val.label + i} divider sx={{ borderRadius: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "caption",
                sx: {
                  fontWeight: 600,
                },
              }}
              primary={val.label}
              secondary={val.value}
            />
            {val.input}
            {val.action}
          </ListItem>
        ))}
      </UiList>
    </>
  );
}
