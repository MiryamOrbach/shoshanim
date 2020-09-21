import React, { useState } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
  import { makeStyles } from '@material-ui/core/styles';
  import MultiSelect from "react-multi-select-component";
 

  const useStyles = makeStyles((theme) => ({
   element:{
     marginTop:20
   }
  }));
 interface MeetingProps{
   ok:Function
 }

export default function AddMeeting(props:MeetingProps){
  const classes = useStyles();
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear" },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" },
  ];
 
  const [selected, setSelected] = useState([]);

    const [teacher,setTeacher]=useState('');
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );

      const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
      };

    const handleChange = (event:any) => {
        setTeacher(event.target.value);
      };
    return(
        <div>
            <Grid direction="column" alignItems="center" justify="center" container>
              <Grid justify="center" className={classes.element} item xs={12} >
            <Typography  variant="h5">
          הוספת אסיפה 
        </Typography>
              </Grid>
              <Grid style={{width:'100%'}} justify="center" className={classes.element} item xs={12} >
              <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"מוזמנים"}
      />
              </Grid>
              <Grid justify="center" alignContent="center" className={classes.element} item xs={12}>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
        color="primary"
        inputVariant="outlined"
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
              <Grid justify="center" alignContent="center" className={classes.element} item xs={12} >

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
        color="primary"
        inputVariant="outlined"
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
    <Button className={classes.element} variant="contained" color="primary" onClick={()=>{props.ok()}}>
        אישור
    </Button>
            </Grid>
        </div>
    )
}