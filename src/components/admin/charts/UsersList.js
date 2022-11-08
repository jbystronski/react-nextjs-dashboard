import React from "react";
import { useChunk } from "core/hooks";
import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Box,
  Stack,
} from "@mui/material";
import Avatar from "core/ui/Avatar";
import { formatDate } from "core/utils/dateHelpers";
import { SectionHeader } from "./SectionHeader";
import { useTheme } from "@mui/styles";
import IconMapper from "core/ui/icons/IconMapper";
import LinkIconButton from "core/ui/LinkIconButton";
import IconButton from "core/ui/IconButton";
import { useRouter } from "next/router";
const arrayRand = require("core/utils/arrayRand");

export default function UsersList() {
  const router = useRouter();

  const limit = 5;

  const {
    palette: { misc: colors },
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
                  borderRadius: 2,
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
                        query: { model: "users", id: user._id },
                      })
                    }
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar
                    size={[42, 42]}
                    path={user.img || undefined}
                    fallback={
                      <Typography sx={{ bgcolor: arrayRand(colors) }}>
                        {user.first_name.charAt(0)}
                      </Typography>
                    }
                  />
                </ListItemAvatar>
                <Stack direction="column">
                  <Typography variant="body">
                    {user.first_name + " " + user.last_name}
                  </Typography>

                  <Typography variant="body2">
                    {formatDate(user.created_at, ".").slice(0, 10)}
                  </Typography>

                  <Typography variant="caption" sx={{ fontStyle: "oblique" }}>
                    {formatDate(user.created_at, ".").slice(10)}
                  </Typography>
                </Stack>
              </ListItem>
              {/* <Divider /> */}
            </React.Fragment>
          ))}
      </List>
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        {[
          {
            icon: "paginate_prev",
            tooltip: "Previous users",
            onClick: prev,
          },
          {
            icon: "paginate_next",
            tooltip: "Next users",
            onClick: next,
          },
        ].map(({ tooltip, icon, ...props }) => (
          <IconButton key={tooltip} tooltip={tooltip} {...props}>
            <IconMapper icon={icon} color="icons.primary" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
