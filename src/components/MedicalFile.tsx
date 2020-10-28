import React, { EventHandler, useState, useEffect } from "react";
import GenerateControls from "./GenerateControls";
import { FileProps } from "./PersonalFile";
import MedicalData from "./MedicalData";
import { ServerData, ChildData } from "./PersonalData";
import BaseRequest from "../helpers/BaseRequest";
export default function MedicalFile(props: FileProps) {

  const [arr, setArr] = useState<ChildData[]>(MedicalData());

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
        let arrS: any[];
        let d = res.data[0].medical_data.replace(/'/g, '"');
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
    <GenerateControls handleNext={props.handleNext} isEdit={props.isEdit} serverData={props.serverData} setServerData={props.setServerData} arr={arr} fileName="medical" title={props.title} />
  );
}