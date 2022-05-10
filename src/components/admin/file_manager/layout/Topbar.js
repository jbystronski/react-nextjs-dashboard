import React from "react";
import { useAdmin } from "lib/contexts/admin/context";
import { useManager } from "../context";
import { IconButton, IconMapper } from "core/ui";

import { Box } from "core/ui/_libs";

export default function Topbar() {
  const { setMaximized, isMaximized } = useManager();

  const { managerOpen, setManagerOpen } = useAdmin();

  const btns = [
    {
      icon: isMaximized ? (
        <IconMapper icon="minimize" fontSize="small" />
      ) : (
        <IconMapper icon="maximize" fontSize="small" />
      ),
      onClick: () => setMaximized(!isMaximized),
      tooltip: isMaximized
        ? "Switch to standard view"
        : "Switch to maximized view"
    },
    {
      icon: <IconMapper icon="x" fontSize="small" />,
      onClick: () => setManagerOpen(!managerOpen),
      tooltip: "Close file manager"
    }
  ];

  return (
    <>
      {btns.map((props, index) => (
        <IconButton
          sx={{ color: "#FFF", fontSize: "small" }}
          key={index}
          size="small"
          {...props}
        />
      ))}
    </>
  );
}
