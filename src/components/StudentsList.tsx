import { Button, Card, FormControl, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BaseRequest from "../helpers/BaseRequest";
import { AutoCompleteList } from "./AddCourse";
import CustomAutoComplete from "./CustomAutoComplete";
import EnhancedTable, { HeadCell } from "./Table";
import { useHistory } from "react-router-dom";

export interface StudentData {
  firstName: string;
  lastName: string;
  birthDate: string;
  item: any;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",

  },
  card: {
    width: "74%",
    margin: "2% 15%",
    padding: "0 2% 2% 2%",
    direction: "rtl"

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function StudentList() {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = useState<StudentData[]>([]);
  const [displayRows, setDisplayRows] = useState<StudentData[]>([]);
  const [child, setChild] = useState<AutoCompleteList>();
  const [showEditChild, setShowEditChild] = useState(false);

  const [students, setStudents] = useState<AutoCompleteList[]>([]);
  useEffect(() => {
    getStudents();
  }, []);
  const getStudents = () => {
    BaseRequest("getStudent")
      .then((res: { data: any[] }) => {
        console.log(res);
        let i: AutoCompleteList[] = [];
        let r: StudentData[] = [];
        res.data.forEach((item) => {
          i.push({ id: item.id, value: `${item.firstName} ${item.lastName}` });
          r.push(createData(item.firstName, item.lastName, item.birthDate, item));
        });
        setStudents(i);
        setRows(r);
        setDisplayRows(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    console.log(rows);
    let lessons = rows.filter((r) => {
      return child ? r.item.id === child.id : true;
    });
    console.log(lessons);
    setDisplayRows(lessons);
  }, [child]);
  const createData = (
    firstName: string,
    lastName: string,
    birthDate: string,
    item: any
  ): StudentData => {
    return {
      firstName,
      lastName,
      birthDate,
      item,
    };
  };

  const clickIcon = (item: any) => {
    setChild(item);

    history.push({
      pathname: "/viewChild/" + item.id,
      state: { child: item },
    });
  };

  const CloseEdit = () => {
    setShowEditChild(false);
  };
  const cells: HeadCell[] = [

    { id: "firstName", label: "שם פרטי", isSortable: true },
    { id: "lastName", label: "שם משפחה", isSortable: true },
    { id: "birthDate", label: "תאריך לידה", isSortable: true },
    {
      id: "edit",
      label: "עריכה",
      type: "icon",
      handleClickIcon: clickIcon,
      isSortable: false,
    },
  ];
  return (

    <Card className={classes.card}>

      <Grid
        spacing={2}
        direction="column"
        container
      >
        <Grid item xs={12}>
          <h1 className="primary">רשימת ילדים</h1>
        </Grid>
        <Grid
          direction="row"
          item
          xs={12}
          justify="flex-end"
          container
        >
          <Grid item xs={3}>
            <FormControl
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
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable headCells={cells} rows={displayRows} />
        </Grid>
      </Grid>
    </Card>
    // </Grid>
  );
}
