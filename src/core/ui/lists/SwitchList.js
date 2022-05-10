import React from "react";

import { List, ListItem, ListItemText, Switch, Text } from "core/ui/_libs";

const SwitchList = ({
  list,
  onChangeHandler,
  label,
  isChecked,
  labelProps,
  listProps,
  subheader
}) => {
  return (
    <List
      {...listProps}
      subheader={
        <ListItem>
          <Text
            sx={{
              textTransform: "uppercase",

              color: "primary.main"
            }}
          >
            {subheader}
          </Text>
        </ListItem>
      }
    >
      {list.length &&
        list.map((item) => (
          <ListItem
            key={typeof item === "object" ? item[label] : item}
            secondaryAction={
              <Switch
                checked={isChecked(item)}
                size="small"
                onChange={() =>
                  onChangeHandler(typeof item === "object" ? item[label] : item)
                }
              />
            }
          >
            <ListItemText
              primary={typeof item === "object" ? item[label] : item}
              primaryTypographyProps={labelProps}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default SwitchList;
