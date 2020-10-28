import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  CardContent,
  Card,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { it } from "date-fns/locale";
import React, { EventHandler, useState, useEffect, useRef } from "react";
import PersonalData, { ChildData, ServerData } from "./PersonalData";
import Radio from "@material-ui/core/Radio";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { format } from "date-fns";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ChildDataService from "./ChildDataService";
import BaseRequest from "../helpers/BaseRequest";
import { Subscription } from "rxjs";

interface GenerateControlsProps {
  serverData: ServerData[];
  setServerData: Function;
  arr: ChildData[];
  title: string;
  isEdit: boolean;
  childId?: string;
  fileName: string;
  handleNext: Function;
  setFinish?: Function;
}

export default function GenerateControls(props: GenerateControlsProps) {

  const [arr, setArr] = useState(props.arr);

  let arrHelper = [...props.serverData];
  const ref = useRef(arrHelper);
  let s: Subscription;

  useEffect(() => {
    ref.current = arrHelper;
  }, [arrHelper]);


  const handleTextChange = (item: ChildData, e: any) => {
    arrHelper[arrHelper.findIndex((a) => a.key === item.id)].value =
      e.target.value;
    let helpArr = [...arr];
    let index = arr.indexOf(item);
    helpArr[index].value = e.target.value;
    if (helpArr[index].isRequired && helpArr[index].isError && item.value)
      helpArr[index].isError = false;
    // helpArr[index]
    setArr(helpArr);
  };
  const handleChange = (item: ChildData) => {
    let helpArr = [...arr];
    let index = arr.indexOf(item);
    helpArr[index].value = !helpArr[index].value;
    arrHelper[arrHelper.findIndex(a => a.key === item.id)].value = arr[index].value;
    setArr(helpArr);
  };

  useEffect(() => {
    s = ChildDataService.next$.subscribe(() => {
      props.setServerData(ref.current);
      if (props.fileName === "academic" && props.setFinish) {
        props?.setFinish(true);
      }
      else
        props.handleNext();
    });
    return () => {
      s.unsubscribe();
    };

  }, [])

  const handleRadioChange = (e: any, item: ChildData) => {
    let helpArr = [...arr];
    let index = arr.indexOf(item);
    helpArr[index].value = +e.target.value;
    arrHelper[arrHelper.findIndex(a => a.key === item.id)].value = +e.target.value;
    setArr(helpArr);
  };
  const componentRender = (item: ChildData, idx: number) => {
    switch (item.type) {
      case "text":
        return (
          <Grid key={idx} item xs={12}>
            <TextField
              style={{ width: "100%", direction: "rtl" }}
              variant="outlined"
              placeholder=""
              label={item.lable}
              value={item.value}
              InputLabelProps={{ shrink: item.value ? true : false }}
              type={item.kind}
              error={item.isRequired && item.isError}
              helperText={item.isError && item.isRequired && `${item.lable} שדה חובה`}
              onChange={(e) => handleTextChange(item, e)}
            ></TextField>
          </Grid>
        );
      case "textArea":
        return (
          <Grid key={idx} item xs={12} style={{ textAlign: "right" }}>
            <TextField
              style={{ width: "100%", textAlign: "right" }}
              variant="outlined"
              placeholder=""
              label={item.lable}
              value={item.value}
              InputLabelProps={{ shrink: item.value ? true : false }}
              multiline
              onChange={(e) => handleTextChange(item, e)}
            ></TextField>
          </Grid>
        );
      case "check":
        return (
          <Grid key={idx} item xs={12}>
            <Card style={{ padding: 0 }} variant="outlined">
              <CardContent style={{ padding: 0, height: 55 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.value ? true : false}
                      onChange={() => handleChange(item)}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label={item.lable}
                  labelPlacement="top"
                />
              </CardContent>
            </Card>
          </Grid>
        );
      case "radio":
        return (
          <Grid key={idx} item xs={12}>
            <Card style={{ padding: 0 }} variant="outlined">
              <CardContent style={{ padding: 0, minHeight: 55 }}>

                <FormControlLabel
                  control={
                    <FormControl variant="outlined">
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        style={{ flexDirection: 'row', marginRight: 22 }}
                        value={item.value !== undefined ? item.value : -1}
                        onChange={(e) => {
                          handleRadioChange(e, item);
                        }}
                      >
                        {item.childrenLables?.map((child, idx) => {
                          return (
                            <FormControlLabel
                              key={idx}
                              value={idx}
                              control={<Radio style={{ flexDirection: "row" }} />}
                              label={child.lable}
                              style={{ color: 'black' }}
                            />
                          );
                        })}
                      </RadioGroup></FormControl>
                  }
                  label={item.lable}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      case "label":
        return (
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              {item.lable}
            </Typography>
          </Grid>
        );
      default:
        break;
    }
  };

  const getGridWrapper = (item: ChildData, idx: number) => {
    return (
      <>
        {
          componentRender(item, idx)
        }
      </>
    );
  };
  return (
    <>
      <Grid justify="center" alignItems="center" container style={{ margin: '2%', width: '98%' }}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginBottom: 8 }} color="primary">{props.title}</Typography>
          </Grid>
          <Grid
            direction="row-reverse"
            spacing={3}
            xs={12}
            justify="flex-start"
            alignItems="flex-start"
            container
            alignContent="flex-start"
          >
            {arr.map((item, idx) => {
              if (!item.condition) return getGridWrapper(item, idx);
              let itemCondition =
                arr[
                arr.findIndex(
                  (s) =>
                    s.id ===
                    (item.conditionById !== undefined && item.conditionById[0])
                )
                ];
              if (itemCondition && itemCondition.type === "radio") {
                item.display = false;
                item.conditionByIdValueRadio?.forEach((element) => {
                  if (
                    itemCondition.value !== null &&
                    itemCondition.value !== undefined &&
                    itemCondition.childrenLables &&
                    itemCondition.childrenLables[itemCondition?.value].id ===
                    element
                  )
                    item.display = true;
                  return;
                });
              }

              return (item.condition &&
                (itemCondition?.value !== undefined
                  ? itemCondition.value
                  : false) ===
                (item.conditionByIdValue !== undefined
                  ? item.conditionByIdValue
                  : true)) ||
                item.display ||
                !item.condition
                ? getGridWrapper(item, idx)
                : null;
            })}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
}