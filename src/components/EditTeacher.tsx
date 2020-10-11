import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  Card,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));
export default function EditTeacher(props: any) {
  const classes = useStyles();
  const arr = ["מכבי", "כללית", "לאומית", "מאוחדת"];
  const month = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];
  const years = [
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];
  const [pay180, setPay180] = useState(false);
  const [pay300, setPay300] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let params = props.history.location.state.teacher;
  const index = arr.indexOf(params.koupa);

  useEffect(() => {
    setSelectedValue(index + 1);
    params.tarif_interv == "300" ? setPay300(true) : setPay180(true);
  }, []);
  const handleChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const editTeacher = () => {};

  return (
    <Grid
      className="container"
      spacing={2}
      alignItems="flex-end"
      justify="flex-end"
      container
    >
      <Grid item xs={12}>
        <Typography
          style={{ marginBottom: 15, marginTop: 15 }}
          variant="h5"
          color="primary"
        >{`${params.nom} ${params.prenom}`}</Typography>
      </Grid>
      <Grid
        justify="center"
        direction="column"
        spacing={3}
        alignItems="center"
        container
        item
        xs={12}
      >
        <Grid style={{ width: "55%" }} item xs={12}>
          <Card
            style={{ marginTop: "2%", flexDirection: "row" }}
            variant="outlined"
          >
            <CardContent>
              <Grid
                style={{ width: "100%" }}
                container
                justify="center"
                alignItems="center"
              >
                <Grid direction="column" spacing={2} item container xs={12}>
                  <Grid item xs={12}>
                    <Typography color="primary">מידע לגבי המטפל</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%", direction: "rtl" }}
                      id="outlined-basic"
                      value={params.nom}
                      label="שם פרטי"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%", direction: "rtl" }}
                      id="outlined-basic"
                      label="שם משפחה"
                      value={params.prenom}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid justify="center" container item xs={12} direction="row">
                    {arr.map((a, idx) => {
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
                          label={arr[idx]}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid style={{ width: "55%" }} item xs={12}>
          <Card
            style={{ marginTop: "2%", flexDirection: "row" }}
            variant="outlined"
          >
            <CardContent>
              <Grid item container justify="center" xs={12}>
                <Grid direction="column" spacing={2} item container xs={12}>
                  <Grid item xs={12}>
                    <Typography color="primary">מידע תקציבי</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      justify="center"
                      container
                      item
                      xs={12}
                      direction="row"
                    >
                      <Typography style={{ marginTop: 7 }} color="primary">
                        שכר לשעה
                      </Typography>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pay180}
                            onChange={(e) => {
                              setPay180(true);
                              setPay300(false);
                            }}
                            color="primary"
                          />
                        }
                        label="180"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pay300}
                            onChange={() => {
                              setPay300(true);
                              setPay180(false);
                            }}
                            color="primary"
                          />
                        }
                        label="300"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid style={{ width: "55%" }} item xs={12}>
          <Card
            style={{ marginTop: "2%", flexDirection: "row" }}
            variant="outlined"
          >
            <CardContent>
              <Grid item container justify="center" xs={12}>
                <Grid direction="column" spacing={2} item container xs={12}>
                  <Grid item xs={12}>
                    <Typography color="primary">הורדת קבצים</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      justify="center"
                      container
                      item
                      xs={12}
                      direction="row"
                    >
                      <Grid item xs={3}>
                        <FormControl
                          style={{ width: "100%" }}
                          color="primary"
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel>חודש</InputLabel>
                          <Select
                            value={selectedMonth}
                            onChange={handleChange}
                            label="חודש"
                          >
                            {month.map((m, idx) => {
                              return (
                                <MenuItem value={idx}>{month[idx]}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl
                          style={{ width: "100%" }}
                          color="primary"
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel>שנה</InputLabel>
                          <Select label="שנה" onChange={handleYearChange}>
                            {years.map((y, idx) => {
                              return (
                                <MenuItem value={idx}>{years[idx]}</MenuItem>
                              );
                            })}
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
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={editTeacher}>
          אישור
        </Button>
      </Grid>
    </Grid>
  );
}
