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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={SignIn} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute exact path="/course" component={CourseList} />
          <PrivateRoute exact path="/teachers" component={TeacherList} />
          <PrivateRoute exact path="/personalFile" component={PersonalFile} />
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
          <PrivateRoute exact path="/child" component={ViewChild} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
