import { Button, FormControl, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BaseRequest from "../helpers/BaseRequest";
import { AutoCompleteList } from "./AddCourse";
import CustomAutoComplete from "./CustomAutoComplete";
import EnhancedTable, { HeadCell } from "./Table";
interface StudentData {
  prenom: string;
  nom: string;
  date_naiss: string;
  item: any;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function StudentList() {
  const classes = useStyles();

  const [rows, setRows] = useState<StudentData[]>([]);
  const [displayRows, setDisplayRows] = useState<StudentData[]>([]);
  const [child, setChild] = useState<AutoCompleteList>();

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
          i.push({ id: item.id_elev, value: `${item.prenom} ${item.nom}` });
          r.push(createData(item.prenom, item.nom, item.date_naiss, item));
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
      return child ? r.item.id_elev === child.id : true;
    });
    console.log(lessons);
    setDisplayRows(lessons);
  }, [child]);
  const createData = (
    prenom: string,
    nom: string,
    date_naiss: string,
    item: any
  ): StudentData => {
    return {
      prenom,
      nom,
      date_naiss,
      item,
    };
  };
  const clickIcon = (item: any) => {
    console.log(item);
  };
  const cells: HeadCell[] = [
    {
      id: "edit",
      label: "עריכה",
      type: "icon",
      handleClickIcon: clickIcon,
      isSortable: false,
    },
    { id: "prenom", label: "שם פרטי", isSortable: true },
    { id: "nom", label: "שם משפחה", isSortable: true },
    { id: "date_naiss", label: "תאריך לידה", isSortable: true },
  ];
  return (
    <Grid
      className="container"
      spacing={2}
      alignItems="flex-end"
      justify="flex-end"
      container
    >
      <Grid
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        container
      >
        <Grid item xs={12}>
          <h1>רשימת ילדים</h1>
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item xs={12} spacing={8}>
          <FormControl
            style={{ width: "30%", float: "right", margin: "2%" }}
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
  );
}
