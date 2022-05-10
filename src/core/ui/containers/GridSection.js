import React from "react";
import { Grid, Divider, Box } from "core/ui/_libs";

export default function GridSection({
  sectionChildren,
  sizing,
  divider = true
}) {
  return (
    <Grid container component={Box} sx={{ mb: 2 }} direction="row">
      <Grid item container xs={12}>
        {sectionChildren.map((child, index) => (
          <Grid key={index} item {...sizing[index]}>
            {child}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sx={{ mt: 3 }}>
        {divider ? <Divider /> : null}
      </Grid>
    </Grid>
  );
}
