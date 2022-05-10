import { useFetch } from "core/hooks";
import React from "react";
import { Divider } from "core/ui/_libs";
import { Review } from "core/ui";

const Reviews = ({ id }) => {
  const { data: reviews, error: reviewsError } = useFetch(
    `/api/db/find/reviews?product_id=${id}`,

    { init: [] }
  );

  return (
    <>
      {reviews &&
        reviews.map((rev, key) => (
          <React.Fragment key={rev["_id"]}>
            <Review
              key={rev["_id"]}
              rate={rev["rate"]}
              text={rev["content"]}
              readOnly={true}
            />
            <Divider />
          </React.Fragment>
        ))}
    </>
  );
};

export default Reviews;
