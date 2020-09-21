import { ChildData } from "./PersonalData";
export default function AcademicHistory() {
  const arr: ChildData[] = [
    {
      type: "check",
      id: "stayGrade",
      lable: "האם הילד נשאר שנתיים באותה כיתה?",
      condition: false,
    },
    {
      type: "text",
      id: "whichGrade",
      lable: "באיזה כיתה?",
      condition: true,
      conditionById: ["stayGrade"],
    },
    {
      type: "textArea",
      id: "stayGradeReasons",
      lable: "מאלו סיבות?",
      condition: true,
      conditionById: ["stayGrade"],
    },
    {
      type: "check",
      id: "learningDeficits",
      lable: "האם אתם מרגישים שלילד שלכם יש קשיים בלמידה?",
      condition: false,
    },

    {
      type: "textArea",
      id: "learningDeficitsKind",
      lable: "מאיזה סוג",
      condition: true,
      conditionById: ["learningDeficits"],
    },
    {
      type: "text",
      id: "learningDeficitsKindStart",
      lable: "מתי (השנה) התחילו הקשיים האלו?",
      kind: "text",
      condition: true,
      conditionById: ["learningDeficits"],
    },
    {
      type: "label",
      lable: "האם אתה רואה את ילדך כ-",
      condition: false,
    },
    {
      type: "radio",
      id: "distracted",
      lable: "מוסח",
      childrenLables: [
        { id: "distractedYes", lable: "כן" },
        { id: "distractedSometimes", lable: "לפעמים" },
        { id: "distractedNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "restless",
      lable: "חסר מנוחה",
      childrenLables: [
        { id: "restlessYes", lable: "כן" },
        { id: "restlessSometimes", lable: "לפעמים" },
        { id: "restlessNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "distorted",
      lable: "משבש",
      childrenLables: [
        { id: "distortedYes", lable: "כן" },
        { id: "distortedSometimes", lable: "לפעמים" },
        { id: "distortedNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "textArea",
      id: "activeComments",
      lable: "הערות",
      condition: false,
    },
    {
      type: "label",
      lable: "האם אתם מודאגים לליקויים של הילד בתחומים האלה?",
      condition: false,
    },
    {
      type: "radio",
      id: "attention",
      lable: "תשומת לב",
      childrenLables: [
        { id: "attentionYes", lable: "כן" },
        { id: "attentionSometimes", lable: "לפעמים" },
        { id: "attentionNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "newLearning",
      lable: "למידה של חומר חדש",
      childrenLables: [
        { id: "newLearningYes", lable: "כן" },
        { id: "newLearningSometimes", lable: "לפעמים" },
        { id: "newLearningNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "memory",
      lable: "זיכרון",
      childrenLables: [
        { id: "memoryYes", lable: "כן" },
        { id: "memorySometimes", lable: "לפעמים" },
        { id: "memoryNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "autonomy",
      lable: "אוטונומיה",
      childrenLables: [
        { id: "autonomyYes", lable: "כן" },
        { id: "autonomySometimes", lable: "לפעמים" },
        { id: "autonomyNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "motorSkills",
      lable: "מיומנויות מוטוריות",
      childrenLables: [
        { id: "motorSkillsYes", lable: "כן" },
        { id: "motorSkillsSometimes", lable: "לפעמים" },
        { id: "motorSkillsNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "radio",
      id: "confidence",
      lable: "ביטחון עצמי/הערכה עצמית",
      childrenLables: [
        { id: "confidenceYes", lable: "כן" },
        { id: "confidenceSometimes", lable: "לפעמים" },
        { id: "confidenceNo", lable: "לא" },
      ],
      condition: false,
    },
    {
      type: "textArea",
      id: "defectsComments",
      lable: "אחר/הערות",
      condition: false,
    },
    {
      type: "label",
      lable: "האם אתם מודאגים לליקויים של הילד בכלים האלה?",
      condition: false,
    },
    {
      type: "check",
      id: "graphics",
      lable: "גרפיקה",
      condition: false,
    },
    {
      type: "check",
      id: "math",
      lable: "חשבון",
      condition: false,
    },
    {
      type: "check",
      id: "expression ",
      lable: "הבעה",
      condition: false,
    },
    {
      type: "check",
      id: "writing",
      lable: "כתיבה",
      condition: false,
    },
    {
      type: "check",
      id: "reading",
      lable: "קריאה",
      condition: false,
    },
    {
      type: "textArea",
      id: "anotherSubject",
      lable: "אחר",
      condition: false,
    },
    {
      type: "label",
      lable: "האם הילד קיבל עזרה/טיפול או חונך מחדש על ידי:",
      condition: false,
    },
    // {
    // type: "",
    // id: "visualDisturbance",
    //   lable: "האם יש לילד הפרעות ראיה?",
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "visualDisturbanceKinds",
    //   lable: "אלו?",
    //   condition: true,
    //   conditionById: "visualDisturbance",
    // },
    // {
    //   type: "textArea",
    //   id: "visualDisturbanceComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "check",
    //   id: "hearingDisturbance",
    //   lable: "האם יש לילד הפרעות שמיעה?",
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "hearingDisturbanceKinds",
    //   lable: "אלו?",
    //   condition: true,
    //   conditionById: "hearingDisturbance",
    // },
    // {
    //   type: "textArea",
    //   id: "hearingDisturbanceComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "check",
    //   id: "ENTProblems",
    //   lable: "האם היו לילד בעיות אף אוזן גרון?",
    //   condition: false,
    // },
    // {
    //   type: "text",
    //   id: "ENTProblemsFrequency",
    //   lable: "תדירות",
    //   kind: "text",
    //   condition: true,
    //   conditionById: "ENTProblems",
    // },
    // {
    //   type: "textArea",
    //   id: "ENTProblemsKinds",
    //   lable: "אלו?",
    //   condition: true,
    //   conditionById: "ENTProblems",
    // },
    // {
    //   type: "textArea",
    //   id: "ENTProblemsComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "label",
    //   lable: "מידע על שנת הילד",
    //   condition: false,
    // },
    // {
    //   type: "radio",
    //   id: "troubleSleeping",
    //   lable: "האם הילד מתקשה לישון?",
    //   childrenLables: [
    //     { id: "troubleSleepingYes", lable: "כן" },
    //     { id: "troubleSleepingSometimes", lable: "לפעמים" },
    //     { id: "troubleSleepingNo", lable: "לא" },
    //   ],
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "troubleSleepingKind",
    //   lable: "אלו",
    //   condition: true,
    //   conditionById: "troubleSleeping",
    // },
    // {
    //   type: "textArea",
    //   id: "troubleSleepingComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "radio",
    //   id: "escortSleeping",
    //   lable: "האם הילד צריך ליווי לשינה?",
    //   childrenLables: [
    //     { id: "escortSleepingYes", lable: "כן" },
    //     { id: "escortSleepingSometimes", lable: "לפעמים" },
    //     { id: "escortSleepingNo", lable: "לא" },
    //   ],
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "escortSleepingComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "radio",
    //   id: "sleepWithParents",
    //   lable: "האם הילד ישן עם הוריו?",
    //   childrenLables: [
    //     { id: "sleepWithParentsYes", lable: "כן" },
    //     { id: "sleepWithParentsSometimes", lable: "לפעמים" },
    //     { id: "sleepWithParentsNo", lable: "לא" },
    //   ],
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "sleepWithParentsComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "radio",
    //   id: "sleepWithBrothers",
    //   lable: "האם הילד ישן עם אחים/אחיות בחדר??",
    //   childrenLables: [
    //     { id: "sleepWithBrothersYes", lable: "כן" },
    //     { id: "sleepWithBrothersSometimes", lable: "לפעמים" },
    //     { id: "sleepWithBrothersNo", lable: "לא" },
    //   ],
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "sleepWithBrothersComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "text",
    //   id: "timeSleeping",
    //   lable: "מתי הילד הולך לישון",
    //   kind: "text",
    //   condition: false,
    // },
    // {
    //   type: "text",
    //   id: "timeWakeUp",
    //   lable: "מתי הילד קם",
    //   kind: "text",
    //   condition: false,
    // },
    // {
    //   type: "text",
    //   id: "timeToSleep",
    //   lable: "כמה זמן לוקח לו להרדם",
    //   condition: false,
    //   kind: "text",
    // },
    // {
    //   type: "check",
    //   id: "wakeUpMood",
    //   lable: "האם הילד נמצא במצב רוח טוב כשהוא קם?",
    //   condition: false,
    // },
    // {
    //   type: "text",
    //   id: "howLongWakeUp",
    //   lable: "כמה זמן לוקח לו ליהיות ער לגמרי",
    //   condition: true,
    //   conditionById: "wakeUpMood",
    // },
    // {
    //   type: "textArea",
    //   id: "wakeUpMoodComments",
    //   lable: "הערות",
    //   condition: false,
    // },
    // {
    //   type: "label",
    //   lable: "מידע על האכלת הילד",
    //   condition: false,
    // },
    // {
    //   type: "check",
    //   id: "eatingDisorder",
    //   lable: "האם לילד יש הפרעות באכילה?",
    //   condition: false,
    // },
    // {
    //   type: "textArea",
    //   id: "eatingDisorderKinds",
    //   lable: "אלו?",
    //   condition: true,
    //   conditionById: "eatingDisorder",
    // },
  ];
  return arr;
}