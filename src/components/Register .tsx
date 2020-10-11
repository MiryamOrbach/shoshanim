import React, { useState } from "react";
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

function getStepContent(stepIndex: number, handleNext: Function) {
  const steps = getSteps();
  switch (stepIndex) {
    case 0:
      return (
        <PersonalFile
          isEdit={false}
          handleNext={handleNext}
          title={steps[stepIndex]}
        />
      );
    case 1:
      return (
        <FamilyFile
          isEdit={false}
          handleNext={handleNext}
          title={steps[stepIndex]}
        />
      );
    case 2:
      return (
        <MedicalFile
          isEdit={false}
          handleNext={handleNext}
          title={steps[stepIndex]}
        />
      );
    case 3:
      return (
        <AcademicFile
          isEdit={false}
          handleNext={handleNext}
          title={steps[stepIndex]}
        />
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function Register() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  async function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
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
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, handleNext)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => ChildDataService.next$.next()}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
