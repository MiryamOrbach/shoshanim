import { Card, CardContent, FormControl, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BaseRequest from "../helpers/BaseRequest";
import { AutoCompleteList } from "./AddCourse";
import CustomAutoComplete from "./CustomAutoComplete";
// import Pdf from "react-to-pdf";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Comment from './Comment';
import ChildDataService from "./ChildDataService";
import { Subscription } from "rxjs";
interface CommentsProps {
  id: string;
  isTeacher?: boolean;
}
export interface CommentData {
  id_interv: string;
  id_elev: string;
  id: string;
  date_heure: string;
  commentaire: string;
  nom: string;
  prenom: string;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
  }
}));
export default function Comments(props: CommentsProps) {
  const [comments, setComments] = useState<CommentData[]>([])
  const [displayComments, setDisplayComments] = useState<CommentData[]>([])
  const [intervenant, setIntervenant] = useState<AutoCompleteList[]>([]);
  const [teacher, setTeacher] = useState<AutoCompleteList>();
  const classes = useStyles();
  useEffect(() => {
    getComments();
    if (!props.isTeacher)
      getIntervant();

  }, [])
  let s: Subscription;

  useEffect(() => {
    s = ChildDataService.commentNext$.subscribe(() => {
      getComments();
    });
    return () => {
      s.unsubscribe();
    };

  }, [])


  useEffect(() => {
    let c = comments.filter((c) => {
      return teacher ? c.id_interv === teacher.id : true;
    });
    console.log(c);
    setDisplayComments(c);
  }, [teacher])
  const getComments = () => {
    const formdata = new FormData();
    let data: any = {
    };
    if (props.isTeacher)
      data['id_interv'] = props.id;
    else
      data['student'] = props.id;
    formdata.append("data", JSON.stringify(data))
    // formdata.append("student", props.id)
    BaseRequest("getComment", formdata)
      .then((res) => {
        console.log(res);
        setComments(res.data)
        setDisplayComments(res.data)
      })
      .catch((e) => {
        console.log(e);
      })
  }
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
  return (
    <Grid
      spacing={2}
      direction="row"
      // alignItems="center"
      container
      justify="flex-end"
    // alignContent="center"
    // xs={10}
    >
      {/* <Grid item xs={12}>
        <h1>הערות</h1>
      </Grid> */}
      <Grid
        direction="row"
        item
        xs={12}
        justify="flex-end"
        container
      >
        <Grid item xs={3}>
          {
            !props.isTeacher ?
              <FormControl
                color="primary"
                variant="outlined"
                className={classes.formControl}
              >
                <CustomAutoComplete
                  label="שם מטפל"
                  data={intervenant}
                  setValue={setTeacher}
                // isLabelShrink={true}
                />
              </FormControl>
              :
              // <Grid item xs={3}>
              <p style={{ textDecoration: "underline" }} className="primary">הערות</p>
            // </Grid>
          }
        </Grid>
      </Grid>
      {displayComments.map((item, idx) => {
        return (
          <Grid item xs={6}>
            <Comment item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
}
