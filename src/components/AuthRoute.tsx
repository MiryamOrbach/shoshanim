import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./Login.comonent";
const AuthRoute = (props: any) => {
  let token = null;
  useEffect(() => {
    token = localStorage.getItem("token");
  }, []);
  return !token ? (
    <Route path="/login" component={Login} />
  ) : (

    <Route {...props} />
  );
};
export default AuthRoute;
