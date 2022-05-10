import React from "react";
import { useChunk } from "core/hooks";

import {
  List,
  ListItem,
  ListItemText,
  Text,
  ListItemAvatar,
  Box,
  Stack,
  Divider
} from "core/ui/_libs";

import { formatDate } from "core/utils/dateHelpers";
import { useTheme } from "@mui/styles";

import { SectionHeader } from ".";
import { IconButton, LinkIconButton, IconMapper, UiAvatar } from "core/ui";

import { useRouter } from "next/router";

const arrayRand = require("core/utils/arrayRand");

export default function UsersList() {
  const router = useRouter();

  const limit = 5;

  const {
    palette: { misc: colors }
  } = useTheme();
  const { chunk, next, prev } = useChunk(
    `/api/db/find/users?_sort.created_at=-1&_only=first_name,last_name,email,created_at,img,_id`,
    limit
  );

  return (
    <Box>
      <SectionHeader
        text="Recently joined"
        icon={<IconMapper icon="user" />}
        bg={colors[0]}
      />
      <List dense sx={{ px: 2, mt: 1 }}>
        {chunk.length &&
          chunk.map((user, k) => (
            <React.Fragment key={user._id}>
              <ListItem
                sx={{
                  mb: 2,
                  bgcolor: "background.dark",
                  py: 1,
                  borderRadius: 2
                  // borderLeftColor: arrayRand(colors),
                  // borderLeftWidth: 3,
                  // borderLeftStyle: "solid"
                }}
                secondaryAction={
                  <LinkIconButton
                    tooltip="View user"
                    size="small"
                    onClick={() =>
                      router.push({
                        pathname: "/admin/resources/[model]/[id]",
                        query: { model: "users", id: user._id }
                      })
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <UiAvatar
                    size={[42, 42]}
                    path={user.img || undefined}
                    fallback={
                      <Text sx={{ bgcolor: arrayRand(colors) }}>
                        {user.first_name.charAt(0)}
                      </Text>
                    }
                  />
                </ListItemAvatar>
                <Stack direction="column">
                  <Text variant="body">
                    {user.first_name + " " + user.last_name}
                  </Text>

                  <Text variant="body2">
                    {formatDate(user.created_at, ".").slice(0, 10)}
                  </Text>

                  <Text variant="caption" sx={{ fontStyle: "oblique" }}>
                    {formatDate(user.created_at, ".").slice(10)}
                  </Text>
                </Stack>
              </ListItem>
              {/* <Divider /> */}
            </React.Fragment>
          ))}
      </List>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        {[
          {
            icon: <IconMapper icon="paginate_prev" color="icons.primary" />,
            tooltip: "Previous users",
            onClick: prev
          },
          {
            icon: <IconMapper icon="paginate_next" color="icons.primary" />,
            tooltip: "Next users",
            onClick: next
          }
        ].map((props) => (
          <IconButton key={props.tooltip} {...props} />
        ))}
      </Box>
    </Box>
  );
}
