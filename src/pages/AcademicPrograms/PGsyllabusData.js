import * as XLSX from "xlsx";

const syllabusFiles = [
  "/academics_excel/pg_semester1.xlsx",
  "/academics_excel/pg_semester2.xlsx",
  "/academics_excel/pg_semester3.xlsx",
  "/academics_excel/pg_semester4.xlsx",
];

// Function to fetch & parse Excel
export async function pgloadSyllabus() {
  const allData = [];

  for (let i = 0; i < syllabusFiles.length; i++) {
    const response = await fetch(syllabusFiles[i]);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    allData.push({
      semester: `Semester ${i + 1}`,
      data: jsonData,
    });
  }

  return allData;
}
