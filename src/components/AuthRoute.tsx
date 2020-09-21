import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login.comonent";
const AuthRoute = (props: any) => {
  let token = null;
  useEffect(() => {
    token = localStorage.getItem("token");
  }, []);
  return !token ? (
    <Route path="/login" component={Login} />
  ) : (
    //   else if (type === "private" && !isAuthUser) return <Redirect to="/" />;

    <Route {...props} />
  );
};
export default AuthRoute;
