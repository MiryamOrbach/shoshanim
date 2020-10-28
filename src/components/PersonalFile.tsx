import React, { EventHandler, useState, useEffect } from "react";
import PersonalData, { ChildData, ServerData } from "./PersonalData";
import GenerateControls from "./GenerateControls";
import BaseRequest from "../helpers/BaseRequest";

export interface FileProps {
  title: string;
  isEdit: boolean;
  handleNext: Function;
  serverData: ServerData[];
  setServerData: Function;
  id?: string;
  setFinish?: Function;
}

export default function PersonalFile(props: FileProps) {
  const [arr, setArr] = useState<ChildData[]>(PersonalData());
  // const [isValid,setIsValid]=useState
  const next = () => {
    let isValid = true;
    let arrHelper = [...arr];
    arrHelper.forEach(a => {
      if (a.isRequired && !a.value) {
        a.isError = true;
        isValid = false;
      }
    })
    if (isValid)
      props.handleNext();
    else setArr(arrHelper)
  }

  const fetchData = () => {
    let server: ServerData[] = []
    if (!props.isEdit) {
      arr.forEach((item, idx) => {
        item.id && server.push(
          { key: item.id, value: item.value !== undefined ? item.value : null }
        )
      });
      props.setServerData(server)
    }
    else {
      let arrHelper = [...arr];
      const formData = new FormData();
      formData.append("student", props.id || "")
      BaseRequest("getStudent", formData).then((res) => {
        console.log(res.data);
        let arrS: any[];
        let d = res.data[0].personal_data.replace(/'/g, '"');
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
  }, []);

  return (
    <GenerateControls arr={arr} fileName="personal" handleNext={next} isEdit={props.isEdit} serverData={props.serverData} setServerData={props.setServerData} title={props.title} />
  );
}
