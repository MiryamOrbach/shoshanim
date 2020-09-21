import React from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import CustomAutoComplete from "./CustomAutoComplete";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface CourseProps {
  ok: Function;
}

export default function AddCourse(props: CourseProps) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [checkAllYear, setCheckAllYear] = React.useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <Grid
      spacing={2}
      direction="column"
      alignItems="center"
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs={12}>
        <Typography variant="h5">הוספת שיעור</Typography>
      </Grid>
      <Grid
        direction="row"
        spacing={1}
        item
        xs={12}
        alignItems="center"
        container
        justify="center"
        alignContent="center"
      >
        <Grid item xs={6}>
          <FormControl
            style={{ width: "100%" }}
            color="primary"
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              שם מטפל
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="שם מטפל"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl
            style={{ width: "100%" }}
            color="primary"
            variant="outlined"
            className={classes.formControl}
          >
            {/* <InputLabel id="demo-simple-select-outlined-label">
              שם הילד
            </InputLabel> */}
            <CustomAutoComplete label={"שם הילד"} />
            {/* <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={age}
              onChange={handleChange}
              label="שם מטפל"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        spacing={1}
        item
        xs={12}
        alignItems="center"
        direction="row"
      >
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ width: "100%" }}
              color="primary"
              inputVariant="outlined"
              margin="normal"
              id="date-picker-dialog-outlined"
              label="תאריך"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              variant="inline"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              color="primary"
              inputVariant="outlined"
              style={{ width: "100%" }}
              variant="inline"
              margin="normal"
              id="time-picker"
              label="שעה"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkAllYear}
              onChange={() => {
                setCheckAllYear(!checkAllYear);
              }}
              name="checkedB"
              color="primary"
            />
          }
          label="שיעור לכל השנה"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.ok();
          }}
        >
          אישור
        </Button>
      </Grid>
    </Grid>
  );
}
