import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import SignIn from "./components/Login.comonent";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import EnhancedTable from "./components/Table";
import InfosFinancieres from "./components/InfosFinancieres";
import NextTreatments from "./components/NextTreatments";
import CourseList from "./components/CourseList";
import TeacherList from "./components/TeachersList";
import PersonalFile from "./components/PersonalFile";
import Comments from "./components/Comments";
import ViewChild from "./components/ViewChild";

import { create } from "jss";
import { PDFDownloadLink, Document, Page, Font } from "@react-pdf/renderer";

import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Register from "./components/Register ";
// import DemoApp from "./components/DemoApp";
import StudentList from "./components/StudentsList";
import { red } from "@material-ui/core/colors";
import EditTeacher from "./components/EditTeacher";
import TeacherHome from "./components/TeacherHome";
import TeacherReport from "./components/TeacherReport";
import MyDoc from "./components/MyDoc";
function App() {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const rtlTheme = createMuiTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#214078",
      },
      secondary: {
        main: "#14738c",
      },
    },
  });
  // const theme = createMuiTheme({
  //   palette: {
  //     secondary: {
  //       main: '#E33E7F'
  //     }
  //   }
  // });
  Font.register({
    family: "Rubik",
    src: "/fonts/Rubik-Regular.ttf",
  });
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={rtlTheme}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={SignIn} />
              <PrivateRoute path="/teacherHome" component={TeacherHome} />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute exact path="/course" component={CourseList} />
              <PrivateRoute exact path="/teachers" component={TeacherList} />
              <PrivateRoute exact path="/students" component={StudentList} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/reportT" component={TeacherReport} />
              <PrivateRoute
                exact
                path="/personalFile"
                component={PersonalFile}
              />
              <PrivateRoute exact path="/comments" component={Comments} />
              <PrivateRoute
                exact
                path="/nextTreatment"
                component={NextTreatments}
              />
              <PrivateRoute
                exact
                path="/infosFinancieres"
                component={InfosFinancieres}
              />
              <PrivateRoute path="/viewChild/:id" component={ViewChild} />
              <PrivateRoute path="/editTeacher/:id" component={EditTeacher} />‏
              {/* <PrivateRoute exact path="/demo" component={DemoApp} /> */}
              <PrivateRoute exact path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </StylesProvider>
    // <div>
    //   <PDFDownloadLink
    //     document={<TeacherReport a="sss" />}
    //     fileName="somename.pdf"
    //   >
    //     {({ blob, url, loading, error }) =>
    //       loading ? "Loading document..." : "הורד עכשיו"
    //     }
    //   </PDFDownloadLink>
    // </div>
  );
}
export default App;
