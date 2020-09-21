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

const useStyles = makeStyles({
  appBar: {
    position: "relative",
  },
  tab: {
    color: "white",
    width: "100%",
  },
  name: {
    width: "10%",
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
    <>
      {userName ? (
        <Paper>
          <BrowserRouter>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <label className={classes.name}>{userName} שלום</label>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  centered
                  className={classes.tab}
                >
                  <Tab href="/course" className={classes.tab} label="קורסים" />
                  <Tab
                    className={classes.tab}
                    href="/teachers"
                    label="מטפלים"
                  />
                  <Tab className={classes.tab} href="children" label="ילדים" />
                  <Tab className={classes.tab} label="כספים" />
                </Tabs>

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
              </Toolbar>
            </AppBar>
          </BrowserRouter>
        </Paper>
      ) : null}
    </>
  );
}
