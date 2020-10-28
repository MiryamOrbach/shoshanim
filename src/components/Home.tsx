

import React, { useState, Fragment, useEffect } from "react";
import Header from "./Header";
import "./Home.css";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import AddCourse from "./AddCourse";
import AddMeeting from "./AddMeeting";
import BaseRequest from "../helpers/BaseRequest";
import { useHistory } from "react-router";

export default function Home() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showAssCourse, setShowAddCourse] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [isNew, setIsNew] = useState(false)
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
        <DialogContent style={{ width: 500, height: 420 }}>
          <AddMeeting ok={closeMeeting} />
        </DialogContent>
      </Dialog>

      {
        isNew &&
        <div className="notafication" onClick={() => history.push("/students")}>
          <p>הגיע טופס הרשמה חדש! אני רוצה לראות אותו</p>
        </div>
      }
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
      <Dialog
        onClose={() => {
          setShowAddCourse(false);
        }}
        open={showAssCourse}
      >
        <DialogContent style={{ width: 500, height: 600 }}>
          <AddCourse ok={closeCourse} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
