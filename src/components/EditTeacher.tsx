import React, { useState, useEffect } from 'react'
import { Grid, CardContent, Card, Typography, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import BaseRequest from '../helpers/BaseRequest';
import Divider from '@material-ui/core/Divider';


export default function EditTeacher(props: any) {
  const history = useHistory();
  const arr = ["מכבי", "כללית", "לאומית", "מאוחדת"];
  const payOptions = ["180", "300"];
  const month = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedPayValue, setSelectedPayValue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  let params = props.history.location.state.teacher;
  const [updatedTeacher, setUpdatedTeacher] = useState({ ...params });
  const index = arr.indexOf(params.koupa);
  const index2 = payOptions.indexOf(params.tarif_interv);
  const [errors, setErrors] = useState({
    email: false,
    tel: false,
    tz: false,
    prenom: false,
    nom: false
  })
  useEffect(() => {
    setSelectedValue(index + 1);
    setSelectedPayValue(index2 + 1);
  }, [])
  const handleChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
    history.push({ pathname: "/reportT", state: { teacher: params } })
  };

  const editTeacher = () => {
    let allValid = true;
    let newTeacher = { ...updatedTeacher };
    let keys = Object.keys(errors);
    let errorsHelper: any;
    errorsHelper = { ...errors }
    keys.forEach((k) => {
      if (!newTeacher[k]) {
        errorsHelper[k] = true
        allValid = false
      }
    })
    if (allValid) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedTeacher));
      BaseRequest("UpdateInterv", formData).then((res) => history.push("/teachers"));
    }
    else setErrors(errorsHelper);
  }



  return (
    <Grid style={{ backgroundColor: '#fafafa' }} justify="center" alignItems="center" container xs={12}>
      <Grid item xs={12}>
        <Card style={{ margin: "2% 15%" }}>
          <CardContent>
            <Typography style={{ marginBottom: 15, marginTop: 15 }} variant="h5" color="primary">{`${params.nom} ${params.prenom}`}</Typography>
            <Grid justify="center" direction="column" spacing={3} alignItems="center" container item xs={12}>
              <Grid style={{ width: '70%' }} item xs={12}>
                <Grid style={{ width: '100%' }} container justify="center" alignItems="center">
                  <Grid direction="column" spacing={2} item container xs={12} >
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>‏


                    <Grid item xs={12}>
                      <Typography color="primary">
                        מידע לגבי המטפל
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        value={updatedTeacher.prenom}
                        label="שם פרטי"
                        error={!updatedTeacher.prenom && errors.prenom}
                        helperText={!updatedTeacher.prenom && errors.prenom ? "שם פרטי חובה" : ""}
                        onChange={(e) => { const t = { ...updatedTeacher }; t.prenom = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="שם משפחה"
                        value={updatedTeacher.nom}
                        error={!updatedTeacher.nom && errors.nom}
                        helperText={!updatedTeacher.nom && errors.nom ? "שם משפחה חובה" : ""}
                        onChange={(e) => { const t = { ...updatedTeacher }; t.nom = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="תעודת זהות"
                        value={updatedTeacher.tz}
                        error={!updatedTeacher.tz && errors.tz}
                        helperText={!updatedTeacher.tz && errors.tz ? "תעודת זהות חובה" : ""}
                        onChange={(e) => { const t = { ...updatedTeacher }; t.tz = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="תחום" value={updatedTeacher.activite} onChange={(e) => { const t = { ...updatedTeacher }; t.activite = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="כתובת" value={updatedTeacher.adresse} onChange={(e) => { const t = { ...updatedTeacher }; t.adresse = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="טלפון"
                        value={updatedTeacher.tel}
                        error={!updatedTeacher.tel && errors.tel}
                        helperText={!updatedTeacher.tel && errors.tel ? "תאריך חובה" : ""}
                        onChange={(e) => { const t = { ...updatedTeacher }; t.tel = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="2 טלפון" value={updatedTeacher.tel2} onChange={(e) => { const t = { ...updatedTeacher }; t.tel2 = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="אימייל"
                        value={updatedTeacher.email}
                        error={!updatedTeacher.email && errors.email}
                        helperText={!updatedTeacher.email && errors.email ? "אימייל חובה" : ""}
                        onChange={(e) => { const t = { ...updatedTeacher }; t.email = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="פרטי בנק" value={updatedTeacher.iban} onChange={(e) => { const t = { ...updatedTeacher }; t.iban = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ width: '100%', direction: "rtl" }}
                        id="outlined-basic"
                        label="מידע נוסף" value={updatedTeacher.infos} onChange={(e) => { const t = { ...updatedTeacher }; t.infos = e.target.value; setUpdatedTeacher(t); }} variant="outlined" />
                    </Grid>
                    <Grid justify="center" container item xs={12} direction="row">
                      {
                        arr.map((a, idx) => {
                          return (<FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedValue == idx + 1}
                                onChange={(e) => { setSelectedValue(idx + 1); const t = { ...updatedTeacher }; t.koupa = arr[idx]; setUpdatedTeacher(t); }}
                                color="primary"
                                value={idx + 1}
                              />
                            }
                            label={arr[idx]}
                          />)
                        })
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>‏

                  </Grid>
                </Grid>

              </Grid>
              <Grid style={{ width: '70%' }} item xs={12}>
                <Card style={{ marginTop: '2%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} variant="outlined">
                  <CardContent>
                    <Grid item container justify="center" xs={12}>
                      <Grid direction="column" spacing={2} item container xs={12} >
                        <Grid item xs={12}>
                          <Typography color="primary">
                            מידע תקציבי
                   </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid justify="center" container item xs={12} direction="row-reverse">
                            <Typography style={{ marginTop: 7, marginLeft: 20 }} color="primary">שכר לשעה</Typography>
                            {payOptions.map((p, idx) => {
                              return <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={selectedPayValue == idx + 1}
                                    onChange={(e) => { setSelectedPayValue(idx + 1); const t = { ...updatedTeacher }; t.tarif_interv = payOptions[idx]; setUpdatedTeacher(t); }}
                                    color="primary"
                                    value={idx + 1}
                                  />
                                }
                                label={payOptions[idx]}
                              />
                            })}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid style={{ width: '70%' }} item xs={12}>
                <Card style={{ marginTop: '2%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} variant="outlined">
                  <CardContent>
                    <Grid item container justify="center" xs={12}>
                      <Grid direction="column" spacing={2} item container xs={12} >
                        <Grid item xs={12}>
                          <Typography color="primary">
                            הורדת קבצים
                   </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid justify="center" spacing={3} container item xs={12} direction="row">
                            <Grid item xs={3}>
                              <FormControl style={{ width: '100%' }} color="primary" variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">חודש</InputLabel>
                                <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={selectedMonth}
                                  label="חודש"
                                  onChange={handleChange}
                                >
                                  {month.map((m, idx) => { return <MenuItem value={idx}>{month[idx]}</MenuItem> })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                              <FormControl style={{ width: '100%' }} color="primary" variant="outlined">
                                <InputLabel>שנה</InputLabel>
                                <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  onChange={handleYearChange}
                                  label="שנה"
                                >
                                  {years.map((y, idx) => { return <MenuItem value={idx}>{years[idx]}</MenuItem> })}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={editTeacher}>אישור</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}