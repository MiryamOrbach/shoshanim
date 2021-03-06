import { ChildData } from "./PersonalData";
export default function FamilyData() {
  const arr: ChildData[] = [
    {
      type: "text",
      id: "fName",
      lable: "שם האב/אפוטרופוס",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "fTz",
      lable: "תעודת זהות אב/אפוטרופוס",
      kind: "number",
      condition: false,
    },
    {
      type: "text",
      id: "fMail",
      lable: "מייל האב/אפוטרופוס",
      kind: "text",
      condition: false,
    },

    {
      type: "text",
      id: "fProfession",
      lable: "מקצוע אב/אפוטרופוס",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "fEducation",
      lable: "רמת השכלה אב/אפוטרופוס",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "mName",
      lable: "שם האם/אפוטרופוס",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "mTz",
      lable: "תעודת זהות אם/אפוטרופוס",
      kind: "number",
      condition: false,
    },
    {
      type: "text",
      id: "mMail",
      lable: "מייל האם/אפוטרופוס",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "mProfession",
      lable: "מקצוע אם/אפוטרופוס",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "mEducation",
      lable: "רמת השכלה אם",
      condition: false,
      kind: "text",
    },
    {
      type: "text",
      id: "cMail",
      lable: "מייל הילד",
      kind: "text",
      condition: false,
    },
    {
      type: "radio",
      id: "familyState",
      lable: "מצב משפחתי",
      condition: false,
      childrenLables: [
        { id: "familyStateDivorcee", lable: "גרושים" },
        { id: "familyStateMarried", lable: "נשואים" },
      ],
    },
    {
      type: "text",
      id: "childrenCount",
      lable: "מספר ילדים",
      kind: "number",
      condition: false,
    },
    {
      type: "text",
      id: "childNum",
      lable: "מקום הילד במשפחה",
      kind: "number",
      condition: false,
    },
    {
      type: "text",
      id: "lang1",
      lable: "שפה בבית 1",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "lang2",
      lable: "שפה בבית 2",
      kind: "text",
      condition: false,
    },
    {
      type: "text",
      id: "lang3",
      lable: "שפה בבית 3",
      kind: "text",
      condition: false,
    },
    {
      type: "textArea",
      id: "comments",
      lable: "הערות/דברים חשוביפ",
      condition: false,
    },
  ];
  return arr;
}
