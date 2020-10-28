import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Theme,
  useTheme,
  Card,
  CardContent,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SignIn from "./Login.comonent";
import AddCourse from "./AddCourse";
import AddMeeting from "./AddMeeting";
import AttachFiles from "./AttachFiles";
import { StudentData } from "./StudentsList";
import Comments from "./Comments";
import NextTreatments from "./NextTreatments";
import InfosFinacieres from "./InfosFinancieres";
import ChildDetails from "./ChildDetails";

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
  child: StudentData;
  ok?: Function;
}

export default function ViewChild(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  let params = props.history.location.state.child;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Card style={{
      width: "70%",

      margin: "4% 15%"
    }}>
      <CardContent style={{
        minHeight: "545px",
        maxHeight: "545px", overflowY: "auto"
      }}>
        <Grid spacing={2} container>
          <Grid justify="center" item xs={12}>
            <Typography
              style={{ marginTop: 15, marginBottom: 15 }}
              color="primary"
              variant="h5"
            >
              {`${params.lastName} ${params.firstName}`}
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
              <ChildDetails isEdit={true} id={props.match.params.id}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <InfosFinacieres />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <NextTreatments id={props.match.params.id} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Comments id={props.match.params.id} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AttachFiles
                id={props.match.params.id}
                name={`${params.lastName} ${params.firstName}`}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </CardContent>

    </Card>
  );
}
