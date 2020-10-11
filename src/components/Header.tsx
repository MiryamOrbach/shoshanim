import React, { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import EnhancedTable from "./Table";
import PrivateRoute from "./PrivateRoute";
import Logo from "../assets/ShoshanimSLCLogo.png";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    position: "relative",
    backgroundColor: "white",
    color: "#214078",
  },
  tabs: {
    width: "50%",
  },
  tab: {
    width: "10%",
    fontWeight: "bold",
  },
  name: {
    width: "25%",
  },
  logo: {
    width: "25%",
  },
});

export default function Header(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.index ? props.index : 0);
  const [userName, setUserName] = useState("");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    let name = localStorage.getItem("userName") || "";
    setUserName(name);
    console.log(userName);
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        {userName ? (
          <Paper>
            <BrowserRouter>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <div className={classes.name}>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      // aria-controls={menuId}
                      aria-haspopup="true"
                      // onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <label>{userName} שלום</label>
                  </div>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    centered
                    className={classes.tabs}
                  >
                    <Tab
                      href="/course"
                      className={classes.tab}
                      label="קורסים"
                    />
                    <Tab
                      className={classes.tab}
                      href="/teachers"
                      label="מטפלים"
                    />
                    <Tab
                      className={classes.tab}
                      href="/students"
                      label="ילדים"
                    />
                    <Tab className={classes.tab} label="כספים" />
                  </Tabs>
                  <div className={classes.logo}>
                    <img
                      style={{ height: 50, width: 50, float: "right" }}
                      src={Logo}
                    />
                  </div>
                </Toolbar>
              </AppBar>
            </BrowserRouter>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  );
}
