import React from "react";

import { Rating as UiRating } from "core/ui/_libs";

import { IconMapper } from ".";

const Rating = ({ value, size = "small", ...props }) => {
  return (
    <UiRating
      size={size}
      value={value}
      {...props}
      emptyIcon={<IconMapper icon="star_empty" color="icons.secondary" />}
      icon={<IconMapper icon="star_filled" color="icons.secondary" />}
    />
  );
};

export default Rating;
