import React, { EventHandler, useState, useEffect } from "react";
import PersonalData, { ChildData, ServerData } from "./PersonalData";
import GenerateControls from "./GenerateControls";

export interface FileProps {
  title: string;
  isEdit: boolean;
  handleNext: Function;
}

export default function PersonalFile(props: FileProps) {
  const [serverArr, setServerArr] = useState<ServerData[]>([]);
  const [arr, setArr] = useState<ChildData[]>(PersonalData());

  const fetchData = () => {
    let server: ServerData[] = []
    if (!props.isEdit) {
      arr.forEach((item, idx) => { item.id && server.push({ key: item.id, value: item.value!==undefined?item.value:null }) });
      setServerArr(server)
    }
    //else{
    //   BaseRequest("ur")
    // set serverarr response
    // serverarr.forEach((item,idx)=>{
    //   arr[arr.findIndex(i=>i.id===item.id)].value=item.value
    // });

    // }
  }



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GenerateControls arr={arr} fileName="personal" handleNext={props.handleNext} isEdit={props.isEdit} serverArr={serverArr} title={props.title} />
  );
}
