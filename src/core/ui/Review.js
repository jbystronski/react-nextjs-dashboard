import React from "react";
import { Paper, Stack, Typography, Box, Rating } from "@mui/material";

const Review = ({ rate, text, readOnly }) => (
  <Stack component={Box} sx={{ p: 2 }} direction="column">
    <Rating value={rate} readOnly={readOnly} />
    <br />
    <Typography variant="body">{text}</Typography>
  </Stack>
);

export default Review;
