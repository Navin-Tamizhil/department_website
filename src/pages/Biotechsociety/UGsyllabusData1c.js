// src/pages/AcademicPrograms/UGsyllabusData.js
import * as XLSX from "xlsx";

const syllabusFiles = [ 
  "/department_website/academics_excel/ug_semester1.xlsx",
  "/department_website/academics_excel/ug_semester2.xlsx",
  "/department_website/academics_excel/ug_semester3.xlsx",
  "/department_website/academics_excel/ug_semester4.xlsx",
  "/department_website/academics_excel/ug_semester5.xlsx",
  "/department_website/academics_excel/ug_semester6.xlsx",
  "/department_website/academics_excel/ug_semester7.xlsx",
  "/department_website/academics_excel/ug_semester8.xlsx",
];

export async function ugloadSyllabus() {
  const allData = [];

  for (let i = 0; i < syllabusFiles.length; i++) {
    try {
      const response = await fetch(syllabusFiles[i]);
      if (!response.ok) {
        console.warn(`Failed to fetch ${syllabusFiles[i]}`);
        // Add dummy data if file doesn't exist
        allData.push({
          semester: `Semester ${i + 1}`,
          data: [
            {
              "Course Code": "Loading...",
              "Course Name": "Loading course data...",
              "Credits": "-",
              "Type": "-",
              "Justification:": "Loading justification...", // Added Justification
            }
          ],
        });
        continue;
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      allData.push({
        semester: `Semester ${i + 1}`,
        data: jsonData.length > 0 ? jsonData : [
          {
            "Course Code": "No data",
            "Course Name": "No courses available",
            "Credits": "-",
            "Type": "-",
            "Justification:": "No justification available.", // Added Justification
          }
        ],
      });
    } catch (error) {
      console.error(`Error loading ${syllabusFiles[i]}:`, error);
      // Add error data
      allData.push({
        semester: `Semester ${i + 1}`,
        data: [
          {
            "Course Code": "Error",
            "Course Name": "Failed to load data",
            "Credits": "-",
            "Type": "-",
            "Justification:": "Error loading justification.", // Added Justification
          }
        ],
      });
    }
  }

  return allData;
}