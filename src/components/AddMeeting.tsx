import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormControl, InputLabel, MenuItem, Button, TextField, FormHelperText } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import MultiSelect from "react-multi-select-component";
import BaseRequest from '../helpers/BaseRequest';
import Meeting from '../models/Meeting';
import PeopleIcon from '@material-ui/icons/PeopleOutlineOutlined';
import { Option } from 'react-multi-select-component/dist/lib/interfaces';
import Select from 'react-select';
import { BorderColor } from '@material-ui/icons';
const useStyles = makeStyles({
  select: {
    border: '1px solid red'
  },
  icon: {
    marginTop: 2
  },
  erroeText: {
    marginRight: 12
  },
  datePicker: {
    width: '100%',
    zIndex: 0
  },
  grid: {
    direction: "rtl"
  },
  okButton: {
    marginRight: "8px"
  }

});


interface MeetingProps {
  ok: Function
}

export default function AddMeeting(props: MeetingProps) {
  const classes = useStyles();
  const [selected, setSelected] = useState<any[]>([]);
  const [teacher, setTeacher] = useState([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [errors, setErrors] = useState({
    sujet: false,
    heure: false,
    date: false,
    intervenant_list: false,
  })
  useEffect(() => {
    BaseRequest("getIntervenant").then((res: any) => {
      let arr: any[] = [];
      res.data.forEach((item: any) => {
        arr.push({ label: `${item.nom} ${item.prenom}`, value: item })
      })
      setOptions(arr)
    });
  }, [])

  const [subject, setSubject] = useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base, minHeight: 53,
      paddingButtom: 0,
      '&:hover': { borderColor: 'black' },
      '&:focus': { borderColor: '#214078' },
      '&:unFocus': { borderColor: '#214078' },
      borderColor: errors.intervenant_list && !selected.length ? 'red' : 'rgba(0, 0, 0, 0.23)'
    })
  }

  const createReunion = () => {
    let allValid = true;
    var date: any;
    var curr = selectedDate ? new Date(selectedDate) : null;
    if (curr) {

      curr.setDate(curr.getDate());
      date = curr.toISOString().substr(0, 10);
    }
    else date = null
    const t: string[] = [];
    selected.map(s => { t.push(s.value.id_interv) });
    let meeting: any;
    const obj: Meeting = {
      intervenant_list: [...t],
      date: selectedDate?.toDateString() ? date : "",
      heure: selectedDate?.toDateString() ? selectedDate?.toLocaleTimeString() : "",
      sujet: subject
    }

    meeting = { ...obj };
    let keys = Object.keys(meeting);
    let errorsHelper: any;
    errorsHelper = { ...errors }
    keys.forEach((k) => {
      if (!meeting[k] || (Array.isArray(meeting[k]) && !meeting[k].length)) {
        errorsHelper[k] = true
        allValid = false
      }
    })
    if (allValid) {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(meeting));
      BaseRequest("createReunion", formdata).then((res) => props.ok())
    }
    else setErrors(errorsHelper);
  }


  return (
    <div>
      <Grid direction="column" spacing={3} container className="rtl">
        <Grid container direction="row-reverse" spacing={2} justify="center" item xs={12} >
          <Grid item>
            <Typography color="primary" variant="h5">
              הוספת אסיפה
        </Typography>
          </Grid>
          <Grid item>
            <PeopleIcon className={classes.icon} color="primary" />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Select
            placeholder='מוזמנים'
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: errors.intervenant_list && !selected.length ? '#f44336' : 'rgba(0, 0, 0, 0.54)',  // Placeholder color
              },
            })}
            closeMenuOnSelect={false}
            onChange={(e) => {
              if (Array.isArray(e)) {
                setSelected(e)
              }
              else setSelected([])
            }}
            isMulti
            styles={customStyles}
            isRtl={true}
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {
            errors.intervenant_list && !selected.length &&
            <FormHelperText className={classes.erroeText} error={true}>מוזמנים חובה</FormHelperText>}
        </Grid>
        <Grid item xs={12}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              PopoverProps={{ dir: 'rtl' }}
              color="primary"
              style={{ width: '100%', zIndex: 0 }}
              inputVariant="outlined"
              label="תאריך"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              variant="inline"
              error={!selectedDate && errors.date}
              helperText={!selectedDate && errors.date ? "תאריך חובה" : ""}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} >

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              PopoverProps={{ dir: 'rtl' }}
              color="primary"
              inputVariant="outlined"
              className={classes.datePicker}
              variant="inline"
              id="time-picker"
              label="שעה"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              error={!selectedDate && errors.heure}
              helperText={!selectedDate && errors.heure ? "שעה חובה" : ""}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.datePicker} id="outlined-basic"
            onChange={(e) => { setSubject(e.target.value) }} label="נושא"
            variant="outlined" error={!subject && errors.sujet}
            helperText={!selectedDate && errors.sujet ? "נושא חובה" : ""} />
        </Grid>
        <Grid item container className={classes.grid} direction="row" xs={12}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={createReunion}
            >
              אישור
          </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => { props.ok() }}
              className={classes.okButton}
            >
              ביטול
          </Button>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}