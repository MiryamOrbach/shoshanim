import React from "react";
import EnhancedTable, { HeadCell } from "./Table";
import { Data } from "./Table";
export default function NextTreatments() {
  // interface HeadCell {
  //   id: keyof Data;
  //   label: string;
  // }
  const clickIcon = () => {
    alert("click");
  };
  const headCells: HeadCell[] = [
    { id: "protein", label: "", type: "icon", handleClickIcon: { clickIcon } },
    { id: "calories", label: "שם" },
    { id: "fat", label: "תחום" },
    { id: "carbs", label: "תאריך" },
  ];

  return (
    <>
      <h1>טיפולים הבאים</h1>
      <EnhancedTable headCells={headCells} />
    </>
  );
}
