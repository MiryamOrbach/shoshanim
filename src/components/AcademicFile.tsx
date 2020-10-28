import React, { EventHandler, useState, useEffect } from "react";
import GenerateControls from "./GenerateControls";
import { FileProps } from "./PersonalFile";
import AcademicData from "./AcademicHistory";
import { ServerData, ChildData } from "./PersonalData";
import BaseRequest from "../helpers/BaseRequest";
export default function AcademicFile(props: FileProps) {

  const [arr, setArr] = useState<ChildData[]>(AcademicData());

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
        let d = res.data[0].academic_data.replace(/'/g, '"');
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
    <GenerateControls setFinish={props.setFinish} handleNext={props.handleNext} arr={arr} serverData={props.serverData} setServerData={props.setServerData} fileName="academic" isEdit={props.isEdit} title={props.title} />
  );
}