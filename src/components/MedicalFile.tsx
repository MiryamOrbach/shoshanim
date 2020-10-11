import React, { EventHandler, useState, useEffect } from "react";
import GenerateControls from "./GenerateControls";
import { FileProps } from "./PersonalFile";
import MedicalData from "./MedicalData";
import { ServerData, ChildData } from "./PersonalData";
export default function MedicalFile(props:FileProps) {

  const [serverArr,setServerArr]=useState<ServerData[]>([]);
  const [arr,setArr]=useState<ChildData[]>(MedicalData());

  const fetchData = () => {
    let server: ServerData[] = []
    if (!props.isEdit) {
      arr.forEach((item, idx) => { item.id && server.push({ key: item.id, value: item.value!==undefined?item.value:null }) });
      setServerArr(server)
    }
  }

  useEffect(()=>{
    fetchData();
  },[])
    //else{
    //   BaseRequest("ur")
    // set serverarr response
    // serverarr.forEach((item,idx)=>{
    //   arr[arr.findIndex(i=>i.id===item.id)].value=item.value
    // });
  return(
    <GenerateControls handleNext={props.handleNext} isEdit={props.isEdit} serverArr={serverArr} arr={arr} fileName="medical" title={props.title}/>
  );
}