import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
export default function Comments() {
  let arr = [
    "ddddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
    "dddddddddddddddd dddddddd",
    "ssssssssssssssss sssssssssss",
  ];
  return (
    <Grid
      spacing={2}
      direction="row"
      alignItems="center"
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={12}>
        <h1>הערות</h1>
      </Grid>
      {arr.map((item, idx) => {
        return (
          <Grid item xs={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
