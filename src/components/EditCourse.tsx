import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";

import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  FormLabel,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
// import Radio from '@material-ui/core/Radio';
import Course from "../models/Course";
// import Teacher from '../models/Teacher';
// import Student from '../models/Student';
import BaseRequest from "../helpers/BaseRequest";
import { AutoCompleteList } from "./AddCourse";
import CustomAutoComplete from "./CustomAutoComplete";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface EditCourseProps {
  course: Course;
  ok: Function;
}

export default function EditCourse(props: EditCourseProps) {
  const classes = useStyles();
  const cancellationFee = ["ללא תשלום", "50% תשלום", " 100% תשלום"];
  const [age, setAge] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [checkCancelCourse, setCheckCancelCourse] = React.useState(false);
  const [cancellationFees, setCancellationFees] = useState("0");
  const [course, setCourse] = useState({ ...props.course });
  const [teachers, setTeachers] = useState<AutoCompleteList[]>([]);
  const [students, setStudents] = useState<AutoCompleteList[]>([]);
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    getTeachers();
    getStudents();
  }, []);

  const getStudents = () => {
    BaseRequest("getStudent")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        res.data.forEach((item) => {
          i.push({
            id: item.id_elev,
            value: `${item.prenom} ${item.nom}`,
            firstName: item.prenom,
            lastName: item.nom,
          });
        });
        setStudents(i);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTeachers = () => {
    BaseRequest("getIntervenant")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        res.data.forEach((item) => {
          i.push({
            id: item.id_interv,
            value: `${item.prenom} ${item.nom}`,
            firstName: item.prenom,
            lastName: item.nom,
          });
        });
        setTeachers(i);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCancellationFees((event.target as HTMLInputElement).value);
  };

  const handleDateChange = (date: any) => {
    let updateCourse: Course = { ...course };
    updateCourse.date = date?.toDateString();
    setCourse(updateCourse);
  };

  const handleTeacherChange = (event: AutoCompleteList) => {
    let updateCourse: Course = { ...course };
    updateCourse.id_interv = event?.id;
    updateCourse.interv_nom = event?.lastName;
    updateCourse.interv_prenom = event?.firstName;
    setCourse(updateCourse);
  };

  const editCourse = () => {
    const formData = new FormData();
    formData.append("id_interv", course.interv_nom ? course.interv_nom : "");
    formData.append("id_elev", course.interv_nom ? course.interv_nom : "");
    formData.append("date_cours", course.date ? course.date : "");
    formData.append("kavoua", course.kavoua ? course.kavoua : "");
    formData.append("id_salle", course.salle ? course.salle : "");
    BaseRequest("editCourse", formData).then((res: any) => {
      props.ok();
    });
  };

  const handleStudentChange = (event: any) => {
    let updateCourse: Course = { ...course };
    updateCourse.id_elev = event?.id;
    updateCourse.eleve_lastname = event?.lastName;
    updateCourse.eleve_name = event?.firstName;
    setCourse(updateCourse);
  };

  return (
    <Grid
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      container
    >
      <Grid
        container
        direction="row-reverse"
        spacing={3}
        justify="center"
        item
        xs={12}
      >
        <Grid item>
          <Typography color="primary" variant="h5">
            עדכון שיעור
          </Typography>
        </Grid>
        <Grid item>
          <EditIcon color="primary" style={{ marginTop: 2 }} />
        </Grid>
      </Grid>
      ‏
      <Grid
        direction="row"
        spacing={1}
        item
        xs={12}
        justify="center"
        alignItems="center"
        container
      >
        <Grid justify="center" item alignContent="center" xs={6}>
          <FormControl
            style={{ width: "100%" }}
            color="primary"
            variant="outlined"
            className={classes.formControl}
          >
            <CustomAutoComplete
              label="שם המטפל"
              data={teachers}
              setValue={handleTeacherChange}
              value={course.id_interv}
              isLabelShrink={false}
            />
          </FormControl>
        </Grid>

        <Grid justify="center" alignContent="center" item xs={6}>
          <FormControl
            style={{ width: "100%" }}
            color="primary"
            variant="outlined"
            className={classes.formControl}
          >
            <CustomAutoComplete
              label="שם הילד"
              data={students}
              value={course && course.id_elev}
              setValue={handleStudentChange}
              isLabelShrink={false}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        item
        xs={12}
        alignItems="center"
        justify="center"
        direction="row"
      >
        <Grid justify={"center"} item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ width: "100%" }}
              color="primary"
              inputVariant="outlined"
              margin="normal"
              id="date-picker-dialog-outlined"
              label="תאריך"
              format="MM/dd/yyyy"
              value={props.course.date}
              onChange={(e) => handleDateChange(e)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              variant="inline"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid justify="center" item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              color="primary"
              inputVariant="outlined"
              style={{ width: "100%" }}
              variant="inline"
              margin="normal"
              id="time-picker"
              label="שעה"
              value={props.course.date + "T" + props.course.heure}
              onChange={(e) => handleDateChange(e)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid
        direction="row"
        spacing={1}
        item
        xs={12}
        justify="center"
        alignItems="center"
        container
      >
        <Grid justify="center" item xs={6}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            label="תשלום למטפל"
            value={props.course.tarif_interv}
            type="number"
            variant="outlined"
          />
        </Grid>

        <Grid justify="center" item xs={6}>
          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            label="עלות"
            value={props.course.tarif_cours}
            type="number"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} justify="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={checkCancelCourse}
              onChange={() => {
                setCheckCancelCourse(!checkCancelCourse);
              }}
              name="checkedB"
              color="primary"
            />
          }
          label="ביטול שיעור"
        />
      </Grid>
      {checkCancelCourse ? (
        <Grid
          direction="row"
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
        >
          <Grid justify="center" container item xs={12} direction="row">
            {cancellationFee.map((a, idx) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedValue == idx + 1}
                      onChange={(e) => {
                        setSelectedValue(idx + 1);
                      }}
                      color="primary"
                      value={idx + 1}
                    />
                  }
                  label={cancellationFee[idx]}
                />
              );
            })}
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} container direction="row" spacing={5} justify="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={editCourse}>
            אישור
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.ok();
            }}
          >
            ביטול
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
