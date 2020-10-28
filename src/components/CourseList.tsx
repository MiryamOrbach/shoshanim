import React, { useEffect, useMemo, useState } from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import EnhancedTable, { HeadCell } from "./Table";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import CustomAutoComplete from "./CustomAutoComplete";
import BaseRequest from "../helpers/BaseRequest";
import { AutoCompleteList } from "./AddCourse";
import { Card, Dialog, DialogContent } from "@material-ui/core";
import EditCourse from "./EditCourse";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",

  },
  card: {
    margin: "1% 15%",
    padding: "0 2% 2% 2%",
    direction: "rtl"

  },
  // container: {
  //   maxHeight: "674px",
  //   overflowX: "hidden",
  //   overflowY: "auto",
  // },
  // container:{
  //  maxHeight: "674px",
  //   overflow-y: auto;
  //   overflow-x: hidden;
  // },
  grid: {
    marginRight: "5px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface CourseData {
  childName: string;
  teacherName: string;
  classRoom: string;
  date: string;
  id_interv: string;
  id_elev: string;
  item: object;
}
export default function CourseList() {
  const [intervenant, setIntervenant] = useState<AutoCompleteList[]>([]);
  const [students, setStudents] = useState<AutoCompleteList[]>([]);
  const [child, setChild] = useState<AutoCompleteList>();
  const [teacher, setTeacher] = useState<AutoCompleteList>();
  const [course, setCourse] = useState<any>();
  const [showEditCourse, setShowEditCourse] = useState(false);
  // const [course,setCourse]=useState<any>();‏
  // const [showEditCourse,setShowEditCourse]=useState(false);‏

  const classes = useStyles();
  const clickIcon = (item: any) => {
    setCourse(item);
    setShowEditCourse(true);
  };
  const cells: HeadCell[] = [

    { id: "childName", label: "שם ילד", isSortable: true },
    { id: "teacherName", label: "שם המטפל", isSortable: true },
    { id: "classRoom", label: "חדר כיתה", isSortable: true },
    { id: "date", label: "תאריך", isSortable: true },
    {
      id: "edit",
      label: "עריכה",
      type: "icon",
      handleClickIcon: clickIcon,
      isSortable: false,
    }
  ];
  const [displayRows, setDisplayRows] = useState<CourseData[]>([]);
  const [rows, setRows] = useState<CourseData[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [checkAllYear, setCheckAllYear] = React.useState(false);
  useEffect(() => {
    getCours();
    getIntervant();
    getStudent();
  }, []);
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);
  useEffect(() => {
    console.log(rows);
    let lessons = rows.filter((r) => {
      return (
        (child ? r.id_elev === child.id : true) &&
        (teacher ? r.id_interv === teacher.id : true) &&
        (selectedDate
          ? r.date === new Date(selectedDate).toISOString().slice(0, 10)
          : true)
      );
    });
    console.log(lessons);
    setDisplayRows(lessons);
  }, [teacher, child, selectedDate]);

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

  const getCours = () => {
    BaseRequest("getCours")
      .then((res: any) => {
        let rows: CourseData[] = [];
        console.log(res.data);
        res.data.forEach((item: any) => {
          rows.push(
            createData(
              `${item.student_firstname} ${item.student_lastname}`,
              `${item.interv_prenom} ${item.interv_nom}`,
              item.name_salle,
              item.date_cours,
              item.id_elev,
              item.id_interv,
              item
            )
          );
        });
        setDisplayRows(rows);
        setRows(rows);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const handleDateChange = (date: Date | null) => {
    if (date === null) setSelectedDate(null);
    else
      new Date(date || "").toString() != "Invalid Date" &&
        setSelectedDate(date);
  };
  const CloseEdit = () => {
    setShowEditCourse(false);
    getCours();
  };
  const createData = (
    childName: string,
    teacherName: string,
    classRoom: string,
    date: string,
    id_elev: string,
    id_interv: string,
    item: object
  ): CourseData => {
    return {
      childName,
      teacherName,
      classRoom,
      date,
      id_elev,
      id_interv,
      item,
    };
  };

  return (
    <>
      {/* <Grid
        className="container"
        spacing={2}
        alignItems="flex-end"
        justify="flex-end"
        container
      > */}
      <Card className={classes.card}>
        <Grid
          spacing={2}
          direction="column"
          container
        >
          <Grid item xs={12}>
            <h1 className="primary" >רשימת הקורסים</h1>
          </Grid>
          <Grid
            direction="row"
            // spacing={2}
            item
            xs={12}
            justify="flex-end"
            // alignItems="flex-end"
            container
          // alignContent="flex-end"
          >
            <Grid item xs={3} className={classes.grid}>
              <FormControl
                // style={{ width: "100%" }}
                color="primary"
                variant="outlined"
                className={classes.formControl}
              >
                <CustomAutoComplete
                  label="שם המטפל"
                  data={intervenant}
                  setValue={setTeacher}
                  isLabelShrink={true}
                />
                {/* <InputLabel id="demo-simple-select-outlined-label">
                שם מטפל
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="שם מטפל"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select> */}
              </FormControl>
            </Grid>

            <Grid item xs={3} className={classes.grid}>
              <FormControl
                // style={{ width: "100%" }}
                color="primary"
                variant="outlined"
                className={classes.formControl}
              >
                <CustomAutoComplete
                  label="שם הילד"
                  data={students}
                  setValue={setChild}
                  isLabelShrink={true}
                />
              </FormControl>
            </Grid>

            <Grid item xs={3} className={classes.grid}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ direction: "rtl" }}
                  color="primary"
                  inputVariant="outlined"
                  id="date-picker-dialog-outlined"
                  // label="תאריך"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="תאריך"
                  variant="inline"
                  className={classes.formControl}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          {/* </Grid> */}
          <Grid item xs={12}>
            <EnhancedTable headCells={cells} rows={displayRows} />
          </Grid>
        </Grid>
      </Card>
      <Dialog
        onClose={() => {
          setShowEditCourse(false);
        }}
        open={showEditCourse}
      >
        <DialogContent style={{ width: 500 }}>
          <EditCourse ok={CloseEdit} course={course} />
        </DialogContent>
      </Dialog>
    </>
  );
}
