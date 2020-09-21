import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SignIn from "./Login.comonent";
import AddCourse from "./AddCourse";
import AddMeeting from "./AddMeeting";
import AttachFiles from "./AttachFiles";
import Comments from "./Comments";
import InfosFinacieres from "./InfosFinancieres";
import NextTreatments from "./NextTreatments";
import BaseRequest from "../helpers/BaseRequest";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

interface Child {
  firstname: string;
  lastName: string;
  age: number;
}
interface ViewChildProps {
  child: Child;
}

export default function ViewChild(props: ViewChildProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    BaseRequest("getStudent")
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Grid container>
      <Grid justify="center" item xs={12}>
        <Typography color="primary" variant="h5">
          ראובן לוי
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="נתונים אישיים" {...a11yProps(0)} />
          <Tab label="נתונים פיננסיים" {...a11yProps(1)} />
          <Tab label="שיעורים עתידיים" {...a11yProps(2)} />
          <Tab label="הערות" {...a11yProps(3)} />
          <Tab label="טפסים" {...a11yProps(4)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <SignIn />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InfosFinacieres />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <NextTreatments />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Comments />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AttachFiles name="ראובן לוי " />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
