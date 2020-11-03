import React, { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { BrowserRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import EnhancedTable from "./Table";
import PrivateRoute from "./PrivateRoute";
import Logo from "../assets/ShoshanimSLCLogo.png";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    position: "relative",
    backgroundColor: "white",
    color: "#214078",
    width: "100%",
    boxShadow: "none"
  },
  tabs: {
    // width: "50%",
  },
  tab: {
    width: "10%",
    fontWeight: "bold",
  },
  name: {
    // width: "25%",
  },
  logo: {
    // width: "25%",
  },
});

export default function Header(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.index ? props.index : 0);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const history = useHistory();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    let name = localStorage.getItem("userName") || "";
    let role = localStorage.getItem("role") || "";
    setRole(role);
    setUserName(name);
    console.log(userName);
  }, []);

  const logoClicked = () => {
    history.push("/home");
  }
  return (
    <>
      {userName ? (
        <Paper style={{ width: "100%", boxShadow: "none" }}>
          <BrowserRouter>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Grid container xs={12} justify="space-between">
                  <Grid item className={classes.name} xs={3}>
                    {/* <div > */}
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
                  </Grid>
                  {
                    role === "1" &&
                    <Grid item xs={6}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "white"
                          }
                        }}
                        centered
                        className={classes.tabs}
                      >
                        <Tab className={classes.tab} label="כספים" />
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
                      </Tabs>
                    </Grid>
                  }
                  <Grid item xs={3}>
                    <div className={classes.logo}>
                      <img
                        style={{ height: 50, width: 50, float: "right", cursor: 'pointer' }}
                        src={Logo}
                        onClick={logoClicked}
                      />‏
‏

                    </div>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </BrowserRouter>
        </Paper>
      ) : null}
    </>
  );
}
