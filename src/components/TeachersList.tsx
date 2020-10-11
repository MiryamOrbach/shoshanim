import {
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BaseRequest from "../helpers/BaseRequest";
import EnhancedTable, { HeadCell } from "./Table";
import { useHistory } from "react-router-dom";
import AddTeacher from "./AddTeacher";

interface TeacherData {
  activite: string;
  koupa: string;
  nom: string;
  prenom: string;
  item: any;
}
const useStyles = makeStyles((theme) => ({
  root: {
    float: "left",
    margin: "2%",
  },
}));
export default function TeacherList() {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState<TeacherData[]>([]);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  useEffect(() => {
    getTeachers();
  }, []);
  const getTeachers = () => {
    BaseRequest("getIntervenant")
      .then((res: any) => {
        let rows: TeacherData[] = [];
        console.log(res.data);
        res.data.forEach((item: any) => {
          rows.push(
            createData(item.activite, item.koupa, item.nom, item.prenom, item)
          );
        });
        // setDisplayRows(rows);
        setRows(rows);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const createData = (
    activite: string,
    koupa: string,
    nom: string,
    prenom: string,
    item: any
  ): TeacherData => {
    return {
      activite,
      koupa,
      nom,
      prenom,
      item,
    };
  };
  const clickIcon = (item: any) => {
    history.push({
      pathname: "editTeacher/" + item.id_interv,
      state: { teacher: item },
    });
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
    { id: "activite", label: "תחום", isSortable: true },
    { id: "koupa", label: "קופת חולים", isSortable: true },
    { id: "nom", label: "שם משפחה", isSortable: true },
    { id: "prenom", label: "שם פרטי", isSortable: true },
  ];
  return (
    <>
      <Dialog
        onClose={() => {
          setShowAddTeacher(false);
        }}
        open={showAddTeacher}
      >
        <DialogContent>
          <AddTeacher
            ok={() => {
              setShowAddTeacher(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Grid
        className="container"
        spacing={2}
        alignItems="flex-end"
        justify="flex-end"
        container
      >
        ‏
        <Grid
          item
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          container
        >
          <Grid item xs={12}>
            <h1>רשימת מטפלים</h1>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowAddTeacher(true);
            }}
          >
            הוספת עובד
          </Button>
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable headCells={cells} rows={rows} />
        </Grid>
      </Grid>
    </>
  );
}
