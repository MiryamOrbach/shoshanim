import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/ShoshanimSLCLogo.png";
import { makeStyles } from "@material-ui/core";
import { StudentData } from "./StudentsList";
import EnhancedTable, { HeadCell } from "./Table";
import BaseRequest from "../helpers/BaseRequest";
import SimpleTable from "./SimpleTable";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";
import "./TeacherReport.css";
import MyDoc from "./MyDoc";

const useStyles = makeStyles((theme) => ({
  print: {
    backgroundColor: "#f5f5f5",
    width: "210mm",
    minHeight: "297mm",
    marginLeft: "auto",
    marginRight: "auto",
    display: "none",
  },
}));

// interface TeacherReportProps{
//     teacher:any;
//     startDate:string;
//     endDate:string;
// }
// interface TeacherData{
//     childName:string;
//     price:string;
//     date:string;
// }
export default function TeacherReport(props) {
  const [rows, setRows] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [print, setPrint] = useState(false);

  useEffect(() => {
    getReunion();
    getCourses();
  }, []);
  const createData = (price, childName, date) => {
    return {
      price,
      childName,
      date,
    };
  };
  //   useEffect(() => {
  //     if (print) printDocument();
  //   }, [print]);

  const getReunion = () => {
    const data = {
      start: "2020-10-01",
      end: "2020-10-20",
      id_interv: "2",
    };
    const form = new FormData();
    form.append("data", JSON.stringify(data));
    BaseRequest("GetReunion", form).then((res) => {
      console.log("hhhhhhh", res.data);
      setMeetings(res.data);
    });
  };

  const getCourses = () => {
    const data = {
      start: "2020-10-01",
      end: "2020-10-25",
      id_interv: "2",
    };
    const form = new FormData();
    form.append("data", JSON.stringify(data));
    BaseRequest("getCours", form).then((res) => {
      console.log("ggggggggg", res);
      let rowsData = [];
      res.success &&
        res.data.forEach((item) => {
          rowsData.push(
            createData(
              item.tarif_cours,
              `${item.student_firstname} ${item.student_lastname}`,
              item.date_cours
            )
          );
        });
      setRows(rowsData);
      setPrint(true);
    });
  };
  let params = "2";
  //   let params = props.history.location.state.teacher;
  const cells = [
    { id: "price", label: "מחיר", isSortable: false },
    { id: "childName", label: "שם הילד", isSortable: false },
    { id: "date", label: "תאריך", isSortable: false },
  ];
  const cells1 = [
    { id: "date", label: "תאריך", isSortable: false },
    { id: "sujet", label: "נושא", isSortable: false },
    { id: "date", label: "מחיר", isSortable: false },
  ];
  let inputRef = useRef();
  const printDocument = () => {
    // inputRef.current.style.display = "inline";
    // const page = document.createElement("div");
    // page.style.height = "200px";
    // page.style.width = "200px";
    // page.style.backgroundColor = "yellow";
    // const p = document.createElement("p");
    // p.innerText = "hghjghjghjj";
    // p.backgroundColor = "red";
    // page.appendChild(p);

    var doc = new jsPDF();

    doc.fromHTML("<div>JOmin</div>", 1, 1);

    doc.save("name.pdf");
    //   const input = document.getElementById("divToPrint1") || "";
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   //   inputRef.current.style.display = "none";
    //   const pdf = new jsPDF();

    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   pdf.save("download.pdf");
    // });
  };
  return <MyDoc a={props.a}/>;
}
