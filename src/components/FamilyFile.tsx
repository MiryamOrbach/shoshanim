import React, { useState, useEffect } from "react";
import GenerateControls from "./GenerateControls";
import { FileProps } from "./PersonalFile";
import FamilyData from "./FamilyData";
import { ServerData, ChildData } from "./PersonalData";
import BaseRequest from "../helpers/BaseRequest";
export default function PersonalFile(props: FileProps) {
  const [arr, setArr] = useState<ChildData[]>(FamilyData());

  const fetchData = () => {
    let server: ServerData[] = []
    if (!props.isEdit) {
      arr.forEach((item, idx) => { item.id && server.push({ key: item.id, value: item.value !== undefined ? item.value : null }) });
      props.setServerData(server)
    }
    else {
      let arrHelper = [...arr];
      const formData = new FormData();
      formData.append("student", props.id || "")
      BaseRequest("getStudent", formData).then((res) => {
        console.log(res.data);
        // const json=
        let arrS: any[];
        let d = res.data[0].family_data.replace(/'/g, '"');
        arrS = [...JSON.parse(d)];
        props.setServerData(arrS)
        arrS.forEach((item, idx) => {
          arrHelper[arrHelper.findIndex(i => i.id === item.key)].value = item.value
        })
        setArr(arrHelper)
      }).catch((e) => {
        console.log(e)
      })
    }
  }

    useEffect(() => {
      fetchData();
    }, [])
    return (
      <GenerateControls handleNext={props.handleNext} arr={arr} isEdit={props.isEdit} serverData={props.serverData} setServerData={props.setServerData} fileName="family" title={props.title} />
    );
  }