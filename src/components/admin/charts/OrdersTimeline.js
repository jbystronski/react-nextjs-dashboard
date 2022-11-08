import { Typography, Box, Chip, Stack } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { useChunk } from "core/hooks";
import { SectionHeader } from "./SectionHeader";
import { formatDate } from "core/utils/dateHelpers";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import IconMapper from "core/ui/icons/IconMapper";
import LinkIconButton from "core/ui/LinkIconButton";
import IconButton from "core/ui/IconButton";

const arrayRand = require("core/utils/arrayRand");

export default function OrdersTimeline() {
  const router = useRouter();
  const limit = 3;

  const {
    palette: { misc: colors },
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
                <Typography variant="body2">
                  {formatDate(order.created_at, ".").slice(0, 10)}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: "oblique" }}>
                  {formatDate(order.created_at).slice(11)}
                </Typography>
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
                    minWidth: "230px",
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
                          CXL: "warning",
                        }[order.payment_status]
                      }
                      label={
                        {
                          AWT: "awaiting payment",
                          ["PAR/P"]: "partial payment",
                          PD: "paid",
                          RFD: "refund",
                          CXL: "cancelled",
                        }[order.payment_status]
                      }
                    />
                    <Typography sx={{ ml: 1 }}>
                      {"by " +
                        order.billing_details.first_name +
                        " " +
                        order.billing_details.last_name}
                    </Typography>
                  </Box>

                  <LinkIconButton
                    tooltip="View order"
                    size="small"
                    onClick={() =>
                      router.push({
                        pathname: "/admin/resources/[model]/[id]",
                        query: { model: "orders", id: order._id },
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
        <IconButton size="small" onClick={prev} tooltip="Previous orders">
          <IconMapper icon="paginate_prev" color="icons.primary" />
        </IconButton>
        <IconButton size="small" onClick={next} tooltip="Next orders">
          <IconMapper icon="paginate_next" color="icons.primary" />
        </IconButton>
      </Box>
    </Box>
  );
}
