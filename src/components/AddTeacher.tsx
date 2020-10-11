import React from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, TextField, Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PersonAdd';

interface AddTeacherProps{
  ok:Function;
}

export default function AddTeacher(props:AddTeacherProps){
    return(
        <Grid spacing={2} direction="column" alignItems="center" justify="center" container>
        <Grid justify="center" container direction="row-reverse" spacing={3} item xs={12} >
          <Grid item>

 <Typography color="primary"  variant="h5">
          הוספת עובד
        </Typography>
          </Grid>
          <Grid item>
<PeopleIcon color="primary" style={{marginTop:2}}/>
          </Grid>
          </Grid> 
          <Grid direction="row" spacing={1} item xs={12} justify="center" alignItems="center" container>
            <Grid justify="center" item alignContent="center" xs={6}>
            <TextField style={{width:'100%'}} id="outlined-basic" label="שם פרטי" variant="outlined" />
            </Grid>
          
          <Grid justify="center" alignContent="center" item xs={6}>
          <TextField style={{width:'100%'}} id="outlined-basic" label="שם משפחה" variant="outlined" />
      </Grid>
      </Grid>
      <Grid container spacing={1} item xs={12} alignItems="center" justify="center" direction="row">
    <Grid justify={"center"} item xs={6}>
    <TextField style={{width:'100%'}} id="outlined-basic" label="קופת חולים" variant="outlined" />
    </Grid>
    <Grid justify="center" item xs={6}>
    <TextField style={{width:'100%'}} id="outlined-basic" label="כתובת" variant="outlined" />
    </Grid>
    </Grid>
    <Grid direction="row" spacing={1} item xs={12} justify="center" alignItems="center" container>
            <Grid  justify="center" item xs={6}>
            <TextField style={{width:'100%'}} id="outlined-basic" label="מס' טלפון" type="number" variant="outlined" />
            </Grid>
          
          <Grid  justify="center" item xs={6}>
          <TextField style={{width:'100%'}} id="outlined-basic" label="אימייל" type="email" variant="outlined" />
      </Grid>
      </Grid>
     
      <Grid item xs={12} container direction="row" spacing={5} justify="center"> 
      <Grid item>
      <Button
            variant="contained"
            color="primary"
            onClick={()=>{props.ok()}}
          >
            אישור
          </Button>
      </Grid>
      <Grid item>
      <Button
            variant="contained"
            color="primary"
            onClick={()=>{}}
          >
            ביטול
          </Button>
      </Grid>
      </Grid>
      </Grid>


    );
}