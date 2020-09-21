import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { it } from "date-fns/locale";
import React, { EventHandler, useState } from "react";
import PersonalData, { ChildData, ServerData } from "./PersonalData";
import Radio from "@material-ui/core/Radio";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { format } from "date-fns";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MedicalData from "./MedicalData";
import FamilyData from "./FamilyData";
export default function PersonalFile() {
  const [arr, setArr] = useState(MedicalData());
  let serverArr: ServerData[] = [];

  let arrHelper = [...arr];
  const handleTextChange = (item: ChildData, e: any) => {
    arrHelper[arrHelper.indexOf(item)].value = e.target.value;
  };
  const handleChange = (item: ChildData) => {
    let helpArr = [...arr];
    let index = arr.indexOf(item);
    arr[index].value = !arr[index].value;

    setArr(helpArr);
  };

  const handleRadioChange = (e: any, item: ChildData) => {
    let helpArr = [...arr];
    let index = arr.indexOf(item);
    arr[index].value = +e.target.value;
    setArr(helpArr);
  };
  const componentRender = (item: ChildData) => {
    switch (item.type) {
      case "label":
        return (
          <Grid container xs={12}>
            <h1>{item.lable}</h1>
          </Grid>
        );
      case "text":
        return (
          <TextField
            style={{ width: "100%" }}
            variant="outlined"
            placeholder=""
            label={item.lable}
            value={format(new Date().getDate(), "yyyy-dd-mm")}
            type={item.kind}
            onChange={(e) => handleTextChange(item, e)}
          ></TextField>
        );
      case "textArea":
        return (
          <FormControlLabel
            control={<TextareaAutosize value={item.value} />}
            label={item.lable}
          />
        );
      case "check":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={item.value}
                onChange={() => handleChange(item)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={item.lable}
          />
        );
      case "radio":
        return (
          <FormControlLabel
            control={
              <RadioGroup
                aria-label="gender"
                name="gender1"
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
                      control={<Radio />}
                      label={child.lable}
                    />
                  );
                })}
              </RadioGroup>
            }
            label={item.lable}
          />
        );
      default:
        break;
    }
  };
  const buttonClick = () => {
    let helpArr = [...arr];
    arrHelper.forEach((item) => {
      let index = helpArr.findIndex((i) => i.id === item.id);
      helpArr[index].value = item.value;
    });

    helpArr.forEach((item) => {
      if (!item.id) return;
      serverArr.push({
        key: item.id,
        value: item.value,
      });
    });
  };

  const getGridWrapper = (item: ChildData, idx: number) => {
    return item.type === "label" ? (
      <Grid item xs={12}>
        <h3>{item.lable}</h3>
      </Grid>
    ) : (
      <Grid key={idx} item xs={2}>
        {componentRender(item)}
      </Grid>
    );
  };
  return (
    <>
      <Grid
        style={{ marginTop: "10%" }}
        direction="row-reverse"
        spacing={3}
        // xs={12}
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
          // })}
          // </>
          // );
        })}
      </Grid>
      <Button onClick={buttonClick}>OK</Button>
    </>
  );
}
