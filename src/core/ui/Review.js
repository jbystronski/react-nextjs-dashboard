import React from "react";

import { Paper, Stack, Text, Box } from "core/ui/_libs";

import { Rating } from "core/ui";

const Review = ({ rate, text, readOnly }) => (
  <Stack component={Box} sx={{ p: 2 }} direction="column">
    <Rating value={rate} readOnly={readOnly} />
    <br />
    <Text variant="body">{text}</Text>
  </Stack>
);

export default Review;
