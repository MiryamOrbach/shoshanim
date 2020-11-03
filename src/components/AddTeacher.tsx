import React, { useState } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, TextField, Button, MenuItem, FormHelperText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PersonAdd';
import BaseRequest from '../helpers/BaseRequest';
import { useHistory } from "react-router-dom";


interface AddTeacherProps {
  ok: Function;
}

export default function AddTeacher(props: AddTeacherProps) {
  const history = useHistory();
  const payoptions = ["180", "300"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tz, setTz] = useState("");
  const [kupa, setKupa] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [activite, setActivite] = useState("");
  const [payPerHouer, setPayPerHouer] = useState<any>();
  const [bank, setBank] = useState("");
  const [info, setInfo] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    tel: false,
    tz: false,
    prenom: false,
    nom: false,
    tarif_interv: false
  })
  const createTeacher = () => {
    let allValid = true;
    let newTeacher: any;
    const obj = {
      "titre": "",
      "nom": lastName,
      "prenom": firstName,
      "tz": tz,
      "activite": activite,
      "tel": phone,
      "tel2": phone2,
      "email": email,
      "adresse": address,
      "iban": bank,
      "koupa": kupa,
      "tarif_interv": payoptions[payPerHouer],
      "infos": info
    }
    newTeacher = { ...obj };
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
      formData.append("data", JSON.stringify(newTeacher));
      BaseRequest("CreateInterv", formData).then((res) => props.ok());
    }
    else setErrors(errorsHelper);
  }

  return (
    <Grid spacing={3} direction="column" container style={{ direction: "rtl" }}>
      <Grid justify="center" container direction="row-reverse" spacing={3} item xs={12} >
        <Grid item>
          <Typography color="primary" variant="h5">
            הוספת עובד
        </Typography>
        </Grid>
        <Grid item>
          <PeopleIcon color="primary" style={{ marginTop: 2 }} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value) }}
          label="שם פרטי" variant="outlined"
          error={!firstName && errors.prenom}
          helperText={!firstName && errors.prenom ? "שם פרטי חובה" : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          label="שם משפחה"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value) }}
          variant="outlined"
          error={!lastName && errors.nom}
          helperText={!lastName && errors.nom ? "שם משפחה חובה" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          label="תעודת זהות"
          value={tz}
          onChange={(e) => { setTz(e.target.value) }}
          variant="outlined"
          error={!tz && errors.tz}
          helperText={!tz && errors.tz ? "תעודת זהות חובה" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          label="תחום"
          value={activite}
          onChange={(e) => { setActivite(e.target.value) }}
          variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          label="קופת חולים"
          value={kupa}
          onChange={(e) => { setKupa(e.target.value) }}
          variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          value={address}
          onChange={(e) => { setAddress(e.target.value) }}
          label="כתובת" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          label="מס' טלפון"
          value={phone}
          onChange={(e) => { setPhone(e.target.value) }}
          type="number" variant="outlined"
          error={!phone && errors.tel}
          helperText={!phone && errors.tel ? "מס' טלפון חובה" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic"
          label="טלפון 2"
          value={phone2}
          onChange={(e) => { setPhone2(e.target.value) }}
          type="number" variant="outlined" />
      </Grid>

      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic" label="אימייל"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          type="email" variant="outlined"
          error={!email && errors.email}
          helperText={!email && errors.email ? "אימייל חובה" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{ width: '100%' }} color="primary" variant="outlined">
          <InputLabel style={{ color: errors.tarif_interv && !payPerHouer ? '#f44336' : "" }} id="demo-simple-select-outlined-label">תשלום לשעה</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            label="תשלום לשעה"
            id="demo-simple-select-outlined"
            value={payPerHouer}
            error={errors.tarif_interv && !payPerHouer}

            onChange={(e) => { setPayPerHouer(e.target.value) }}
          >
            {payoptions.map((p, idx) => { return <MenuItem value={idx}>{payoptions[idx]}</MenuItem> })}
          </Select>
          {errors.tarif_interv && !payPerHouer && <FormHelperText error={true}>תשלום לשעה חובה</FormHelperText>}

        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic" label="פרטי חשבון"
          value={bank}
          onChange={(e) => { setBank(e.target.value) }}
          variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField style={{ width: '100%' }}
          id="outlined-basic" label="מידע נוסף"
          value={info}
          multiline
          onChange={(e) => { setInfo(e.target.value) }}
          variant="outlined" />
      </Grid>

      <Grid item container direction="row" xs={12} style={{ direction: "ltr" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={createTeacher}
          >
            אישור
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            style={{ marginLeft: "8px" }}
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