import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@material-ui/core';
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

const useStyles = makeStyles({
  // select: {
  //   zIndex: 2
  // }
});


interface MeetingProps {
  ok: Function
}

export default function AddMeeting(props: MeetingProps) {
  const classes = useStyles();
  const [selected, setSelected] = useState<any[]>([]);
  const [teacher, setTeacher] = useState([]);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    BaseRequest("getIntervenant").then((res: any) => {
      console.log("ijijij", res)
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

  const createReunion = () => {
    const t: string[] = [];
    selected.map(s => { t.push(s.value.id_interv) });
    const meeting: Meeting = {
      intervenant_list: [...t],
      date: selectedDate?.toDateString() ? selectedDate.toLocaleDateString() : "",
      heure: selectedDate?.toTimeString() ? selectedDate.toLocaleTimeString() : "",
      sujet: subject
    }
    console.log("ndndndnd", meeting)
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(meeting));
    BaseRequest("createReunion", formdata).then((res) => props.ok())
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
            <PeopleIcon style={{ marginTop: 2 }} color="primary" />
          </Grid>
        </Grid>
        <Grid justify="center" item xs={12} >
          <MultiSelect
            overrideStrings={{ selectAll: "בחר הכל", selectSomeItems: "מוזמנים" }}
            options={options}
            value={selected}

            // className={classes.select}
            onChange={setSelected}
            labelledBy={''}
          />
        </Grid>
        <Grid item xs={12}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              color="primary"
              style={{ width: '100%', zIndex: 0 }}
              inputVariant="outlined"
              // id="date-picker-dialog-outlined"
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
        <Grid item xs={12} >

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              color="primary"
              inputVariant="outlined"
              style={{ width: '100%', zIndex: 0 }}
              variant="inline"
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
          <TextField style={{ width: '100%', zIndex: 0 }} id="outlined-basic" onChange={(e) => { setSubject(e.target.value) }} label="נושא" variant="outlined" />
        </Grid>
        <Grid spacing={1} item container alignItems="flex-start" justify="flex-start" direction="row" xs={12}>
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
            >
              ביטול
          </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}