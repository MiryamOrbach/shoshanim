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
import ChildDetails from "./ChildDetails";


export default function Register() {
   return <ChildDetails isEdit={false} />
}
