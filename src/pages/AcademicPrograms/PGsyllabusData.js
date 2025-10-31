import * as XLSX from "xlsx";

const syllabusFiles = [
  "/department_website/academics_excel/pg_semester1.xlsx",
  "/department_website/academics_excel/pg_semester2.xlsx",
  "/department_website/academics_excel/pg_semester3.xlsx",
  "/department_website/academics_excel/pg_semester4.xlsx",
];

// Elective files with custom semester labels
const electiveFiles = [
  {
    path: "/department_website/academics_excel/pg_semester1_elective.xlsx",
    semester: "Semester 1 Department Elective",
  },
  {
    path: "/department_website/academics_excel/pg_semester2_elective.xlsx",
    semester: "Semester 2 Department Elective",
  },
  {
    path: "/department_website/academics_excel/pg_semest1_other_elective.xlsx",
    semester: "Semester 1 Other Department Elective",
  },
  {
    path: "/department_website/academics_excel/pg_semester2_other_elective.xlsx",
    semester: "Semester 2 Other Department Elective",
  },
];

// Load main syllabus files
async function loadMainSyllabus() {
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

// Load electives separately with their specific semester headers
async function loadElectiveSyllabus() {
  const electiveData = [];

  for (const file of electiveFiles) {
    const response = await fetch(file.path);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    electiveData.push({
      semester: file.semester,
      data: jsonData,
    });
  }

  return electiveData;
}

// Main loader function exporting combined syllabus
export async function pgloadSyllabus() {
  const mainSyllabus = await loadMainSyllabus();
  const electiveSyllabus = await loadElectiveSyllabus();

  return [...mainSyllabus, ...electiveSyllabus];
}
