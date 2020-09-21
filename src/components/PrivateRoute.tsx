import React from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "./Header";

interface PrivateRouteProps {
  component: any;
  path: string;
}
export default function PrivateRoute(props: PrivateRouteProps) {
  const arr = ["/course", "/teachers", "/childrens"];
  return (
    <>
      <Header index={arr.indexOf(props.path) || 0} />
      {localStorage.getItem("token") ? (
        <Route path={props.path} component={props.component} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
