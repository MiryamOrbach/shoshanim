import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, FormLabel, RadioGroup, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Course from '../models/Course';
import Teacher from '../models/Teacher';
import Student from '../models/Student';
import BaseRequest from '../helpers/BaseRequest';
import { AutoCompleteList } from './AddCourse';
import CustomAutoComplete from './CustomAutoComplete';

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
  ok: Function
}

export default function EditCourse(props: EditCourseProps) {
  const classes = useStyles();
  const cancellationFee = ["ללא תשלום", "50% תשלום", " 100% תשלום"];
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(props.course.date_cours ? props.course.date_cours : "")
  );
  const [checkCancelCourse, setCheckCancelCourse] = React.useState(false);
  const [cancellationFees, setCancellationFees] = useState('0');
  const [course, setCourse] = useState({ ...props.course });
  const [teachers, setTeachers] = useState<AutoCompleteList[]>([]);
  const [students, setStudents] = useState<AutoCompleteList[]>([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedClass, setSelectedClass] = useState<any>(props.course.id_salle);
  const [tarifCours, setTarifCours] = useState<any>(props.course.tarif_cours);
  const [tarifInterv, setTarifInterv] = useState<any>(props.course.tarif_interv);
  const [salle, setSalle] = useState<any[]>([]);
  const [child, setChild] = useState<AutoCompleteList>({ id: props.course.id_elev, firstName: props.course.eleve_name, lastName: props.course.eleve_lastname });
  const [teacher, setTeacher] = useState<AutoCompleteList>({ id: props.course.id_interv, firstName: props.course.interv_prenom, lastName: props.course.interv_nom });


  useEffect(() => {
    getTeachers();
    getStudents();
    getClasses();
  }, []);
  // useEffect(() => {
  //   salle.forEach(s => { if (s.id == props.course.id_salle) setSelectedClass(s); })

  // }, [salle])

  const getStudents = () => {
    BaseRequest("getStudent")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        res.data.forEach((item) => {
          i.push({
            id: item.id,
            value: `${item.firstName} ${item.lastName}`,
            firstName: item.firstName,
            lastName: item.lastName,
          });
        });
        setStudents(i);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getClasses = () => {
    BaseRequest("getSalle").then(res => {
      console.log("classes", res);
      setSalle(res.data);
    })
  }

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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)

  };

  const editCourse = () => {
    var curr = new Date(selectedDate ? selectedDate : "");
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    const updatedCourse: Course = {
      id_cours: props.course.id_cours,
      id_interv: teacher?.id,
      id_elev: child?.id,
      date_cours: selectedDate?.toLocaleDateString() ? date : "",
      hour_cours: selectedDate ? selectedDate.toLocaleTimeString() : "",
      kavoua: course.kavoua ? course.kavoua : "",
      id_salle: selectedClass,
      tarif_interv: tarifInterv,
      tarif_cours: tarifCours
      //ביטול שיעור
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedCourse));
    BaseRequest("UpdateCours", formData).then((res: any) => { props.ok() })
  }

  return (
    <Grid spacing={3} direction="column" container>
      <Grid container justify="center" item xs={12} >
        <Grid item>
          <Typography color="primary" variant="h5">
            עידכון שיעור
        </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{ width: '100%' }} color="primary" variant="outlined" className={classes.formControl}>
          <CustomAutoComplete
            label="שם המטפל"
            data={teachers}
            setValue={setTeacher}
            value={course.id_interv}
            isLabelShrink={false}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl style={{ width: '100%' }} color="primary" variant="outlined" className={classes.formControl}>

          <CustomAutoComplete
            label="שם הילד"
            data={students}
            value={course && course.id_elev}
            setValue={setChild}
            isLabelShrink={false}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: '100%', direction: "rtl" }}
            color="primary"
            inputVariant="outlined"
            margin="normal"
            id="date-picker-dialog-outlined"
            label="תאריך"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            variant="inline"
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            color="primary"
            inputVariant="outlined"
            style={{ width: '100%', direction: "rtl" }}
            variant="inline"
            margin="normal"
            id="time-picker"
            label="שעה"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }} className="rtl" id="outlined-basic" label="תשלום למטפל" value={tarifInterv} onChange={(e) => setTarifInterv(e.target.value)} type="number" variant="outlined" />
      </Grid>

      <Grid item xs={12}>
        <TextField className="rtl" style={{ width: '100%' }} id="outlined-basic" label="עלות" value={tarifCours} onChange={(e) => { setTarifCours(e.target.value) }} type="number" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{ width: '100%' }} variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">כיתה</InputLabel>
          <Select
            className="rtl"
            onChange={(e) => { setSelectedClass(e.target.value) }}
            label="כיתה"
            value={selectedClass}
          >
            {salle.map((s, idx) => { return <MenuItem value={s.id}>{s.kita}</MenuItem> })}
          </Select>
        </FormControl>      </Grid>
      <Grid container xs={12} justify="center">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkCancelCourse}
                onChange={() => { setCheckCancelCourse(!checkCancelCourse) }}
                name="checkedB"
                color="primary"
              />
            }
            label="ביטול שיעור"
          />
        </Grid>
      </Grid>
      {
        checkCancelCourse ?
          <Grid direction="row" container item xs={12} justify="center" alignItems="center">
            <Grid justify="center" container item xs={12} direction="row">
              {
                cancellationFee.map((a, idx) => {
                  return (<FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedValue == idx + 1}
                        onChange={(e) => { setSelectedValue(idx + 1) }}
                        color="primary"
                        value={idx + 1}
                      />
                    }
                    label={cancellationFee[idx]}
                  />)
                })
              }
            </Grid>
          </Grid> : null
      }
      <Grid spacing={1} item container alignItems="flex-start" justify="flex-start" direction="row" xs={12}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={editCourse}
          >
            אישור
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { props.ok() }}
          >
            ביטול
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}