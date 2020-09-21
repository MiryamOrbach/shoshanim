import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import EnhancedTable from "./Table";
export default function InfosFinacieres() {
  const arr = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%"];
  const [indexChecked, setIndexChecked] = React.useState(0);
  const handleChange = (index: number) => {
    debugger;
    setIndexChecked(index + 1);
    // setIndexChecked(event.target);
  };
  return (
    <div>
      <h1>Info Financieres</h1>
      <Grid
        spacing={2}
        direction="column"
        justify="flex-start"
        container
        style={{ width: "20%", marginLeft: "auto" }}
      >
        <Grid item xs={12}>
          <Typography variant="h5">הנחה</Typography>
        </Grid>
        <Grid
          direction="row"
          spacing={1}
          item
          xs={12}
          justify="flex-start"
          alignItems="flex-start"
          container
          alignContent="flex-start"
        >
          {arr.map((item, idx) => {
            return (
              <Grid key={idx} item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={idx + 1 === indexChecked}
                      onChange={() => handleChange(idx)}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label={item}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <EnhancedTable />
    </div>
  );
}
