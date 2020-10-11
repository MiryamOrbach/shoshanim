import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
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
import BaseRequest from "../helpers/BaseRequest";
import { greatestDurationDenominator } from "@fullcalendar/react";

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
export interface AutoCompleteList {
  id: string;
  value: string;
  lastName?: string;
  firstName?: string;
}
export default function AddCourse(props: CourseProps) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [intervenant, setIntervenant] = useState<AutoCompleteList[]>([]);
  const [students, setStudents] = useState<AutoCompleteList[]>([]);
  const [child, setChild] = useState<AutoCompleteList>();
  const [teacher, setTeacher] = useState<AutoCompleteList>();
  const [checkAllYear, setCheckAllYear] = React.useState(false);
  useEffect(() => {
    getIntervant();
    getStudent();
  }, []);
  const getStudent = () => {
    BaseRequest("getStudent")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        res.data.forEach((item) => {
          i.push({ id: item.id_elev, value: `${item.prenom} ${item.nom}` });
        });
        setStudents(i);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let formData = new FormData();
  const ok = () => {
    BaseRequest("createCours", formData).then((res) =>
      console.log("creates", res)
    );
  };
  const getIntervant = () => {
    BaseRequest("getIntervenant")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        res.data.forEach((item) => {
          i.push({ id: item.id_interv, value: `${item.prenom} ${item.nom}` });
        });
        setIntervenant(i);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
            <CustomAutoComplete
              data={intervenant}
              label="שם מטפל"
              setValue={setTeacher}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl
            style={{ width: "100%" }}
            color="primary"
            variant="outlined"
            className={classes.formControl}
          >
            <CustomAutoComplete
              label={"שם הילד"}
              data={students}
              setValue={setChild}
            />
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
            ok();
            // console.log("child", child);
            // console.log("teacher", teacher);
            props.ok();
          }}
        >
          אישור
        </Button>
      </Grid>
    </Grid>
  );
}
