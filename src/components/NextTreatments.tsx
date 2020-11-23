import React, { useEffect, useState } from "react";
import BaseRequest from "../helpers/BaseRequest";
import EnhancedTable, { HeadCell } from "./Table";
export interface NextTreatmentData {
  fullName: string;
  interv_activite: string;
  date_cours: string;
  item: any;
}
interface NextTreatmentProps {
  id: string;
}
export default function NextTreatments(props: NextTreatmentProps) {

  const [rows, setRows] = useState<NextTreatmentData[]>([]);

  useEffect(() => {
    getNextTreatment()
  }, [])

  const getNextTreatment = () => {
    const formData = new FormData();
    const json = { option: "futur", student: props.id }
    formData.append("data", JSON.stringify(json))
    BaseRequest("getCours", formData)
      .then((res: { data: any[] }) => {
        let nt: NextTreatmentData[] = [];
        res.data.forEach((item) => {
          nt.push(createData(`${item.interv_prenom} ${item.interv_nom}`, item.interv_activite, item.date_cours, item));
        })
        setRows(nt)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const createData = (
    fullName: string,
    interv_activite: string,
    date_cours: string,
    item: any
  ): NextTreatmentData => {
    return {
      fullName,
      interv_activite,
      date_cours,
      item,
    };
  };


  const headCells: HeadCell[] = [
    { id: "fullName", label: "שם" },
    { id: "interv_activite", label: "תחום" },
    { id: "date_cours", label: "תאריך" },
  ];

  return (
    <>
      <EnhancedTable headCells={headCells} rows={rows} />
    </>
  );
}
