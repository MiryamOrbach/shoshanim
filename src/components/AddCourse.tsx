import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { Button, TextField, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import BaseRequest from '../helpers/BaseRequest';
import Course from '../models/Course';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import CustomAutoComplete from './CustomAutoComplete';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%"
  }, icon: {
    marginTop: 2
  },
  grid: {
    direction: "rtl"
  }, mainGrid: {
    marginTop: 3
  },
  button: {
    marginRight: "8px"
  }
}));

interface CourseProps {
  ok: Function
}


export interface AutoCompleteList {
  id?: string;
  value?: string;
  isError?: boolean;
  lastName?: string;
  firstName?: string;
}


export default function AddCourse(props: CourseProps) {

  const classes = useStyles();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    null
  );
  const [intervenant, setIntervenant] = useState<AutoCompleteList[]>([]);
  const [students, setStudents] = useState<AutoCompleteList[]>([]);
  const [salle, setSalle] = useState<any[]>([]);
  const [child, setChild] = useState<AutoCompleteList>();
  const [teacher, setTeacher] = useState<AutoCompleteList>();
  const [tarifCours, setTarifCours] = useState("")
  const [tarifInterv, setTarifInterv] = useState("")
  const [checkAllYear, setCheckAllYear] = React.useState(false);
  const [errors, setErrors] = useState({
    id_interv: false,
    id_elev: false,
    date_cours: false,
    hour_cours: false,
    kavoua: false,
    id_salle: false,
    id_mode_fact: false,
    tarif_cours: false,
    tarif_interv: false

  })
  const [selectedClass, setSelectedClass] = useState<any>("")

  useEffect(() => {
    getIntervant();
    getStudent();
    getClasses();
  }, []);

  const getClasses = () => {
    BaseRequest("getSalle").then(res => {
      console.log("classes", res);
      setSalle(res.data);
    })
  }

  const getStudent = () => {
    BaseRequest("getStudent")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        res.data.forEach((item) => {
          i.push({ id: item.id, value: `${item.firstName} ${item.lastName}` });
        });
        setStudents(i);
      })
      .catch((e) => {
        console.log(e);
      });
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

  const createCourse = () => {
    let allValid = true;
    var date: any;
    var curr = selectedDate ? new Date(selectedDate) : null;
    if (curr) {

      curr.setDate(curr.getDate());
      date = curr.toISOString().substr(0, 10);
    }
    else date = null
    let newCourse: any;
    const obj = {
      id_interv: teacher?.id,
      id_elev: child?.id,
      date_cours: selectedDate?.toDateString() ? date : "",
      hour_cours: selectedDate?.toDateString() ? selectedDate?.toLocaleTimeString() : "",
      kavoua: checkAllYear ? "1" : "0",
      id_salle: selectedClass,
      id_mode_fact: "2",
      tarif_cours: tarifCours,
      tarif_interv: tarifInterv

    }
    newCourse = { ...obj };
    let keys = Object.keys(newCourse);
    let errorsHelper: any;
    errorsHelper = { ...errors }
    keys.forEach((k) => {
      if (!newCourse[k]) {
        errorsHelper[k] = true
        allValid = false
      }
    })
    console.log(keys);
    console.log("newewewe", newCourse);
    if (allValid) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(newCourse));
      BaseRequest("createCours", formData).then(
        (res) => history.push({ pathname: "/course" })
      );
    }
    else setErrors(errorsHelper)
  }
  return (
    <Grid spacing={3} direction="column" container className="rtl">
      <Grid container direction="row-reverse" spacing={3} justify="center" item xs={12} >
        <Grid item>
          <Typography color="primary" variant="h5">
            הוספת שיעור
        </Typography>
        </Grid>
        <Grid className={classes.mainGrid} item>
          <AddIcon color="primary" className={classes.icon} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl
          color="primary"
          variant="outlined"
          className={classes.formControl}
        >
          <CustomAutoComplete
            data={intervenant}
            label="שם מטפל"
            setValue={setTeacher}
            isError={errors["id_interv"]}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl
          color="primary"
          variant="outlined"
          className={classes.formControl}
        >
          <CustomAutoComplete

            label={"שם הילד"}
            data={students}
            setValue={setChild}
            isError={errors["id_elev"]}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            PopoverProps={{ dir: 'rtl' }}
            className="maxWidth"
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
            className="maxWidth"
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
        <TextField className="maxWidth" id="outlined-basic" label="תשלום למטפל"
          type="number" variant="outlined"
          value={tarifInterv} onChange={(e) => setTarifInterv(e.target.value)}
          error={!tarifInterv && errors.tarif_interv}
          helperText={!tarifInterv && errors.tarif_interv ? "תשלום למטפל חובה" : ""} />
      </Grid>

      <Grid item xs={12}>
        <TextField className="maxWidth" id="outlined-basic" label="עלות"
          type="number" variant="outlined"
          value={tarifCours} onChange={(e) => setTarifCours(e.target.value)}
          error={!tarifCours && errors.tarif_cours} helperText={!tarifCours && errors.tarif_cours ? " עלות חובה" : ""} />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ color: errors.id_salle && !selectedClass ? '#f44336' : "" }} id="demo-simple-select-outlined-label">כיתה</InputLabel>
          <Select

            onChange={(e) => { setSelectedClass(e.target.value); console.log("ccccc", selectedClass) }}
            label="כיתה"
            value={selectedClass}
            error={errors.id_salle && !selectedClass}

          >
            {salle.map((s, idx) => {
              return <MenuItem
                key={idx} value={idx}>{s.kita}</MenuItem>
            })}
          </Select>
          {errors.id_salle && !selectedClass && <FormHelperText error={true}>כיתה שדה חובה</FormHelperText>}
        </FormControl>      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkAllYear}
                onChange={() => { setCheckAllYear(!checkAllYear) }}
                name="checkedB"
                color="primary"
              />
            }
            label="שיעור לכל השנה"
          />
        </Grid>
      </Grid>
      <Grid item container className={classes.grid} direction="row" xs={12}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={createCourse}
          >
            אישור
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { props.ok() }}
            className={classes.button}
          >
            ביטול
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}