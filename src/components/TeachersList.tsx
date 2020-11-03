import {
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  Grid,
  Card,
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
  button: { width: "100%" },
  card: {
    margin: "1% 15%",
    padding: "0 2% 2% 2%",
    direction: "rtl"

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

    { id: "prenom", label: "שם פרטי", isSortable: true },
    { id: "nom", label: "שם משפחה", isSortable: true },
    { id: "activite", label: "תחום", isSortable: true },
    { id: "koupa", label: "קופת חולים", isSortable: true },
    {
      id: "edit",
      label: "עריכה",
      type: "icon",
      handleClickIcon: clickIcon,
      isSortable: false,
    },
  ];
  return (
    <>

      <Card className={classes.card}>‏
        <Grid
          item
          spacing={2}
          direction="column"

          container
        >
          <Grid item xs={12}>
            <h1 className="primary">רשימת מטפלים</h1>
          </Grid>
          <Grid container item direction="row" xs={12} justify="flex-end">

            <Grid item xs={2} >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowAddTeacher(true);
                }}
              >
                הוספת עובד
          </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <EnhancedTable headCells={cells} rows={rows} />
          </Grid>
        </Grid>
      </Card>
      <Dialog
        onClose={() => {
          setShowAddTeacher(false);
        }}
        open={showAddTeacher}
      >
        <DialogContent style={{ width: 500, height: 600 }}>
          <AddTeacher
            ok={() => {
              setShowAddTeacher(false);
              getTeachers();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
