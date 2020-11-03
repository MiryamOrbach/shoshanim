import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersonalFile from "./PersonalFile";
import FamilyFile from "./FamilyFile";
import MedicalFile from "./MedicalFile";
import AcademicFile from "./AcademicFile";
import BaseRequest from "../helpers/BaseRequest";
import ChildDataService from "./ChildDataService";
import { ServerData } from "./PersonalData";
import { Grid, Card, CardContent } from "@material-ui/core";
import Logo from "../assets/ShoshanimSLCLogo.png";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["מידע כללי אודות הילד", "מידע משפחתי", "מידע רפואי", "מידע לימודי"];
}

function getStepContent(stepIndex: number, setFinish: Function, id: string, handleNext: Function, isEdit: boolean, personalServerData: ServerData[], setPersonalServerData: Function, familyServerData: ServerData[], setFamilylServerData: Function, academiclServerData: ServerData[], setAcademicServerData: Function, medicalServerData: ServerData[], setMedicalServerData: Function) {
  const steps = getSteps();
  switch (stepIndex) {
    case 0:
      return (
        <PersonalFile
          id={id}
          isEdit={isEdit}
          handleNext={handleNext}
          title={steps[stepIndex]}
          serverData={personalServerData}
          setServerData={setPersonalServerData}
        />
      );
    case 1:
      return (
        <FamilyFile
          id={id}
          isEdit={isEdit}
          handleNext={handleNext}
          title={steps[stepIndex]}
          serverData={familyServerData}
          setServerData={setFamilylServerData} />
      );
    case 2:
      return (
        <MedicalFile
          id={id}
          isEdit={isEdit}
          handleNext={handleNext}
          title={steps[stepIndex]}
          serverData={medicalServerData}
          setServerData={setMedicalServerData}
        />
      );
    case 3:
      return (
        <AcademicFile
          id={id}
          isEdit={isEdit}
          handleNext={handleNext}
          title={steps[stepIndex]}
          serverData={academiclServerData}
          setServerData={setAcademicServerData}
          setFinish={setFinish}
        />
      );
    default:
      return "Unknown stepIndex";
  }
}
interface ChildDetailsProps {
  isEdit: boolean;
  id?: string;
  scroll?: Function;
}
export default function ChildDetails(props: ChildDetailsProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [personalServerData, setPersonalServerData] = useState<ServerData[]>([])
  const [familyServerData, setFamilylServerData] = useState<ServerData[]>([])
  const [medicalServerData, setMedicalServerData] = useState<ServerData[]>([])
  const [academiclServerData, setAcademicServerData] = useState<ServerData[]>([])
  const [finish, setFinish] = useState(false);
  const steps = getSteps();

  useEffect(() => {
    if (finish)
      handleNext();
  }, [finish])
  // useEffect(() => {
  //   if (activeStep === steps.length - 1) {
  //     setFinish(true)
  //     // handleNext()
  //   }
  // }, [academiclServerData])
  function handleNext() {
    window.scrollTo(0, 0);
    if (props.scroll)
      props.scroll();
    console.log("academic", academiclServerData)
    console.log("family", familyServerData)
    if (activeStep === steps.length - 1 && finish) {
      setFinish(false);
      let firstName = personalServerData.find(p => p.key === "firstName")?.value;
      let lastName = personalServerData.find(p => p.key === "lastName")?.value;
      const formdata = new FormData();
      const json = {
        personal: personalServerData,
        family: familyServerData,
        academic: academiclServerData,
        medical: medicalServerData,
        firstName: firstName,
        lastName: lastName
      }

      formdata.append("data", JSON.stringify(json))
      if (props.isEdit) {
        formdata.append("action", "update");
        formdata.append("id", props.id || "");
        //append childId
      } else formdata.append("action", "add");

      BaseRequest("student", formdata)
        .then((res) => {
          console.log(res);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((e) => {
          console.log(e);
        })

    }
    else setActiveStep((prevActiveStep) => prevActiveStep + 1);

  }

  const handleBack = () => {
    window.scrollTo(0, 0);
    if (props.scroll)
      props.scroll();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (

    <Grid container xs={12}>
      { !props.isEdit ?
        <Grid style={{ marginTop: '2%' }} spacing={3} item xs={12} container direction="row-reverse" justify="center">
          <Grid item>
            <div>
              <img
                style={{ height: 50, width: 50, float: "right" }}
                src={Logo}
              />
            </div>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="primary">טופס הרשמה</Typography>
          </Grid>
        </Grid> : null}
      <Grid item xs={12} style={{ marginTop: '3%', marginBottom: '3%', marginLeft: '13%', marginRight: '13%' }}>
        <Card variant="outlined">
          <CardContent>
            <div className={classes.root}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                style={{ direction: "rtl" }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      כל השלבים הושלמו
            </Typography>
                  </div>
                ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {getStepContent(activeStep, setFinish, props.id ? props.id : "", handleNext, props.isEdit, personalServerData, setPersonalServerData, familyServerData, setFamilylServerData, academiclServerData, setAcademicServerData, medicalServerData, setMedicalServerData)}
                      </Typography>
                      <Grid item spacing={2} container direction="row" xs={12} justify="center">
                        <Grid item>


                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => ChildDataService.next$.next()}
                          >
                            {activeStep === steps.length - 1 ? "סיום" : "הבא"}
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            disabled={activeStep === 0}
                            variant="outlined"
                            onClick={handleBack}
                            className={classes.backButton}
                          >
                            הקודם
              </Button>
                        </Grid>
                      </Grid>
                    </div>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>);
}
