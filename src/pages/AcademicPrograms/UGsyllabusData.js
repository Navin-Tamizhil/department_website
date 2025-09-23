import * as XLSX from "xlsx";

const syllabusFiles = [
  "/academics_excel/ug_semester1.xlsx",
  "/academics_excel/ug_semester2.xlsx",
  "/academics_excel/ug_semester3.xlsx",
  "/academics_excel/ug_semester4.xlsx",
  "/academics_excel/ug_semester5.xlsx",
  "/academics_excel/ug_semester6.xlsx",
  "/academics_excel/ug_semester7.xlsx",
  "/academics_excel/ug_semester8.xlsx",
  "/academics_excel/ug_department_elective.xlsx",
];

// Function to fetch & parse Excel files and return structured syllabus data
export async function ugloadSyllabus() {
  const allData = [];

  for (let i = 0; i < syllabusFiles.length; i++) {
    const response = await fetch(syllabusFiles[i]);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Label semesters 1 to 8 accordingly, and the last as Department Elective
    let semesterLabel =
      i < 8 ? `Semester ${i + 1}` : "Department Elective";

    allData.push({
      semester: semesterLabel,
      data: jsonData,
    });
  }

  return allData;
}
