

import React, { useState, Fragment, useEffect } from "react";
import Header from "./Header";
import { Button, Dialog, DialogContent, Grid, makeStyles } from "@material-ui/core";
import AddCourse from "./AddCourse";
import AddMeeting from "./AddMeeting";
import BaseRequest from "../helpers/BaseRequest";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  notefication: {
    cursor: 'pointer'
  },
  coursContent: {
    width: 500, height: 600
  },
  content: {
    width: 500, height: 420
  }

}));

export default function Home() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showAssCourse, setShowAddCourse] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [isNew, setIsNew] = useState(false)
  const classes = useStyles();

  const history = useHistory();
  useEffect(() => {
    BaseRequest("getNewstudent").then((res) => {
      console.log(res);
      if (res.success)
        setIsNew(true);

    }).catch((e) => console.log(e))
  }, [])
  const closeMeeting = () => {
    setShowAddMeeting(false);
  };

  const closeCourse = () => {
    setShowAddCourse(false);
  };

  return (
    <div>
      <Dialog
        onClose={() => {
          setShowAddMeeting(false);
        }}
        open={showAddMeeting}
      >
        <DialogContent className={classes.content} >
          <AddMeeting ok={closeMeeting} />
        </DialogContent>
      </Dialog>
      <Grid container className='rtl' justify="flex-start" direction='column'>
        {
          isNew &&
          <Grid item xs={3}>
            {/* <div className="notafication" > */}
            <Alert severity="success" variant="filled" className={classes.notefication} onClick={() => history.push("/students")}>הגיע טופס הרשמה חדש! אני רוצה לראות אותו</Alert>

            {/* </div> */}
          </Grid>
        }
        <Grid item xs={12}>
          <div className="buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowAddCourse(true);
              }}
            >
              הוספת שיעור
        </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowAddMeeting(true);
              }}
            >
              הוספת אסיפה
        </Button>
          </div>
        </Grid>
      </Grid>
      <Dialog
        onClose={() => {
          setShowAddCourse(false);
        }}
        open={showAssCourse}
      >
        <DialogContent className={classes.coursContent} >
          <AddCourse ok={closeCourse} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
