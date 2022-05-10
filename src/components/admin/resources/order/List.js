import {
  Text,
  List as UiList,
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Box,
  ListItemSecondaryAction
} from "core/ui/_libs";

export default function List({ items, header, icon }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.dark",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Text sx={{ fontWeight: 600, mb: 1 }} variant="caption">
          {header}
        </Text>
        {icon}
      </Box>

      <UiList dense disablePadding sx={{ mb: 3, mt: 2 }}>
        {items.map((val) => (
          <ListItem key={val.label} divider sx={{ borderRadius: 0 }}>
            {/* <ListItemIcon>{val.icon}</ListItemIcon> */}
            <ListItemText
              primaryTypographyProps={{
                variant: "caption",
                sx: {
                  fontWeight: 600
                }
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
