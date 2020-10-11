import React, { EventHandler, useState, useEffect } from "react";
import GenerateControls from "./GenerateControls";
import { FileProps } from "./PersonalFile";
import AcademicData from "./AcademicHistory";
import { ServerData, ChildData } from "./PersonalData";
export default function AcademicFile(props:FileProps) {

  const [serverArr,setServerArr]=useState<ServerData[]>([]);
  const [arr,setArr]=useState<ChildData[]>(AcademicData());

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
    <GenerateControls handleNext={props.handleNext} arr={arr} serverArr={serverArr} fileName="academic" isEdit={props.isEdit} title={props.title}/>
  );
}