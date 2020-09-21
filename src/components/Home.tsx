// import React, { useState, Fragment } from "react";
// import Header from "./Header";
// // import Icon from "@material-ui/core/Icon";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
// import "./Home.css";
// import { Button } from "@material-ui/core";

// export default function Home() {
//   const [selectedDate, handleDateChange] = useState(new Date());

//   return (
//     <div>
//       <div className="notafication">
//         <p>
//           <NotificationsNoneIcon />
//           הגיע טופס הרשמה חדש! אני רוצה לראות אותו
//         </p>
//       </div>
//       <div className="buttons">
//         <Button variant="contained" color="primary">
//           הוספת שיעור
//         </Button>
//         <Button variant="contained" color="primary">
//           הוספת אסיפה
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useState, Fragment } from "react";
import Header from "./Header";
import "./Home.css";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import AddCourse from "./AddCourse";
import AddMeeting from "./AddMeeting";

export default function Home() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showAssCourse, setShowAddCourse] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);

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
        <DialogContent>
          <AddMeeting ok={closeMeeting} />
        </DialogContent>
      </Dialog>
      {/* <div className="header">
        <Header></Header>
      </div> */}
      <div className="notafication">
        <p>הגיע טופס הרשמה חדש! אני רוצה לראות אותו</p>
      </div>
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
        <DialogContent>
          <AddCourse ok={closeCourse} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
