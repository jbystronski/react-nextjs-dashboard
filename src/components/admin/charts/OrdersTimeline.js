import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Text,
  Box,
  Chip,
  Stack
} from "core/ui/_libs";

import { useChunk } from "core/hooks";
import { SectionHeader } from ".";
import { formatDate } from "core/utils/dateHelpers";
import { useTheme } from "@mui/styles";
import { IconButton, LinkIconButton, IconMapper, UiAvatar } from "core/ui";
import { useRouter } from "next/router";

const arrayRand = require("core/utils/arrayRand");

export default function OrdersTimeline() {
  const router = useRouter();
  const limit = 3;

  const {
    palette: { misc: colors }
  } = useTheme();
  const { chunk, next, prev } = useChunk(
    `/api/db/find/orders?_sort.created_at=-1&_only=billing_details.first_name,billing_details.last_name,payment_status,created_at`,
    limit
  );

  return (
    <Box>
      <SectionHeader text="Latest orders" bg={colors[0]} />
      <Timeline>
        {chunk.map((order) => {
          return (
            <TimelineItem key={order._id}>
              <TimelineOppositeContent>
                <Text variant="body2">
                  {formatDate(order.created_at, ".").slice(0, 10)}
                </Text>
                <Text variant="caption" sx={{ fontStyle: "oblique" }}>
                  {formatDate(order.created_at).slice(11)}
                </Text>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: arrayRand(colors) }} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    bgcolor: "background.dark",
                    p: 1,
                    px: 2,
                    borderRadius: "8px",
                    minWidth: "230px"
                  }}
                >
                  <Box>
                    <Chip
                      sx={{ my: 1 }}
                      size="small"
                      color={
                        {
                          AWT: "error",
                          ["PAR/P"]: "info",
                          PD: "success",
                          RFD: "success",
                          CXL: "warning"
                        }[order.payment_status]
                      }
                      label={
                        {
                          AWT: "awaiting payment",
                          ["PAR/P"]: "partial payment",
                          PD: "paid",
                          RFD: "refund",
                          CXL: "cancelled"
                        }[order.payment_status]
                      }
                    />
                    <Text sx={{ ml: 1 }}>
                      {"by " +
                        order.billing_details.first_name +
                        " " +
                        order.billing_details.last_name}
                    </Text>
                  </Box>

                  <LinkIconButton
                    tooltip="View order"
                    size="small"
                    onClick={() =>
                      router.push({
                        pathname: "/admin/resources/[model]/[id]",
                        query: { model: "orders", id: order._id }
                      })
                    }
                  />
                </Stack>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>

      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="small"
          icon={<IconMapper icon="paginate_prev" color="icons.primary" />}
          onClick={prev}
          tooltip="Previous orders"
        />
        <IconButton
          size="small"
          icon={<IconMapper icon="paginate_next" color="icons.primary" />}
          onClick={next}
          tooltip="Next orders"
        />
      </Box>
    </Box>
  );
}
