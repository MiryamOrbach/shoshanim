import { format } from "date-fns";

export interface ChildData {
  type?: string;
  lable?: string;
  id?: string;
  condition?: boolean;
  conditionById?: string[];
  conditionByIdValue?: boolean;
  conditionByIdValueRadio?: string[];
  kind?: string;
  childrenLables?: ChildData[];
  display?: boolean;
  value?: any;
  isError?:boolean;
  isRequired?:boolean;

}
export interface ServerData {
  key: string;
  value?: any;
}
export default function PersonalData() {
  const arr: ChildData[] = [
    {
      type: "text",
      id: "firstName",
      lable: "שם פרטי",
      kind: "text",
      condition: false,
      isRequired:true
    },
    {
      type: "text",
      id: "lastName",
      lable: "שם משפחה",
      kind: "text",
      condition: false,
      isRequired:true

    },
    {
      type: "text",
      id: "birthDate",
      lable: "תאריך לידה",
      kind: "date",
      value: format(new Date(), "dd-mm-yyyy"),
      isRequired:true,
      condition: false,
    },
    {
      type: "text",
      id: "age",
      lable: "גיל",
      kind: "numebr",
      condition: false,
    },
    {
      type: "text",
      id: "tz",
      lable: "תעודת זהות",
      condition: false,
      kind: "number",
      isRequired:true

    },
    {
      type: "text",
      id: "address",
      lable: "כתובת",
      condition: false,
      kind: "text",
      isRequired:true

    },
    {
      type: "text",
      id: "mPhone",
      lable: "טלפון האם",
      kind: "number",
      condition: false,
      isRequired:true

    },
    {
      type: "text",
      id: "fPhone",
      lable: "טלפון האב",
      kind: "number",
      condition: false,
      isRequired:true

    },
    {
      type: "text",
      id: "cPhone",
      lable: "טלפון הילד",
      kind: "number",
      condition: false,
    },
    {
      type: "text",
      id: "hPhone",
      lable: "טלפון הבית",
      kind: "numebr",
      condition: false,
    },
    {
      type: "text",
      id: "aPhone",
      lable: "טלפון אחר",
      condition: false,
      kind: "number",
    },
    {
      type: "text",
      id: "school",
      lable: "בית ספר",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "sPhone",
      lable: "טלפון בית ספר",
      kind: "number",
      condition: false,
    },
    {
      type: "text",
      id: "schoolAddress",
      lable: "כתובת בית ספר",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "principle",
      lable: "מנהל/ת",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "teacher",
      lable: "מורה מחנכת",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "grade",
      lable: "כיתה",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "doctor",
      lable: "רופא משפחה",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "hmo",
      lable: "קופת חולים",
      kind: "text",
      condition: false,
      isRequired:true

    },
    {
      type: "check",
      id: "insurance",
      lable: "ביטוח משלים",
      condition: false,
    },
    {
      type: "check",
      id: "hmoRequest",
      lable: "האם הוגשה בקשה לקופת חולים בקשר לטיפולים?",
      condition: false,
    },
    {
      type: "text",
      id: "requestDate",
      lable: "באיזה תאריך",
      kind: "date",
      value: new Date().toString(),

      condition: true,
      conditionById: ["hmoRequest"],
    },
    {
      type: "check",
      id: "requestAnswer",
      lable: "האם קיבלתם תשובה?",
      condition: true,
      conditionById: ["hmoRequest"],
    },
  ];
  return arr;
}
