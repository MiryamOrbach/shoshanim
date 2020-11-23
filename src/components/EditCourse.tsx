import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Button, FormLabel, RadioGroup, TextField, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Course from '../models/Course';
import BaseRequest from '../helpers/BaseRequest';
import { AutoCompleteList } from './AddCourse';
import CustomAutoComplete from './CustomAutoComplete';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  txt: {
    width: '100%',
    direction: 'ltr'
  },
  width: {
    width: '100%'
  }
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
  const [errors, setErrors] = useState({
    id_interv: false,
    id_elev: false,
    date_cours: false,
    hour_cours: false,
    kavoua: false,
    id_salle: false,
    tarif_cours: false,
    tarif_interv: false
  })


  useEffect(() => {
    getTeachers();
    getStudents();
    getClasses();
  }, []);

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
    let allValid = true;
    var curr = new Date(selectedDate ? selectedDate : "");
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    let updateCourse: any;
    const obj: Course = {
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
    updateCourse = { ...obj };
    let keys = Object.keys(errors);
    let errorsHelper: any;
    errorsHelper = { ...errors }
    keys.forEach((k) => {
      if (!updateCourse[k]) {
        errorsHelper[k] = true
        allValid = false
      }
    })
    if (allValid) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updateCourse));
      BaseRequest("UpdateCours", formData).then((res: any) => { props.ok() })
    }
    else setErrors(errorsHelper);
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
        <FormControl color="primary" variant="outlined" className={classes.formControl}>
          <CustomAutoComplete
            label="שם המטפל"
            data={teachers}
            setValue={setTeacher}
            value={course.id_interv}
            isLabelShrink={false}
            isError={errors["id_interv"]}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl color="primary" variant="outlined" className={classes.formControl}>

          <CustomAutoComplete
            label="שם הילד"
            data={students}
            value={course && course.id_elev}
            setValue={setChild}
            isLabelShrink={false}
            isError={errors["id_elev"]}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            PopoverProps={{ dir: 'rtl' }}
            className={classes.width}
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
            error={!selectedDate && errors.date_cours}
            helperText={!selectedDate && errors.date_cours ? "תאריך חובה" : ""}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            PopoverProps={{ dir: 'rtl' }}
            color="primary"
            inputVariant="outlined"
            className={classes.width}
            variant="inline"
            margin="normal"
            id="time-picker"
            label="שעה"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            error={!selectedDate && errors.hour_cours}
            helperText={!selectedDate && errors.hour_cours ? "שעה חובה" : ""}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField className={classes.txt}
          id="outlined-basic"
          label="תשלום למטפל" value={tarifInterv}
          onChange={(e) => setTarifInterv(e.target.value)}
          type="number" variant="outlined"
          error={!tarifInterv && errors.tarif_interv}
          helperText={!tarifInterv && errors.tarif_interv ? "תשלום למטפל חובה" : ""} />
      </Grid>

      <Grid item xs={12}>
        <TextField
          className={classes.txt}
          id="outlined-basic"
          label="עלות"
          value={tarifCours}
          onChange={(e) => { setTarifCours(e.target.value) }}
          type="number"
          variant="outlined"
          error={!tarifCours && errors.tarif_cours}
          helperText={!tarifCours && errors.tarif_cours ? "עלות חובה" : ""} />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ color: errors.id_salle && !selectedClass ? '#f44336' : "" }} id="demo-simple-select-outlined-label">כיתה</InputLabel>
          <Select
            className="rtl"
            onChange={(e) => { setSelectedClass(e.target.value) }}
            label="כיתה"
            value={selectedClass}
            error={errors.id_salle && !selectedClass}

          >
            {salle.map((s, idx) => { return <MenuItem key={idx} value={s.id}>{s.kita}</MenuItem> })}
          </Select>
          {errors.id_salle && !selectedClass && <FormHelperText error={true}>כיתה שדה חובה</FormHelperText>}
        </FormControl>
      </Grid>
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