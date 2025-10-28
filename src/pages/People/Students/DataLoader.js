// src/pages/People/Students/DataLoader.js

const capitalizeName = (name) =>
  name
    ? name
        .toString()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
    : "";

export const loadStudentData = async () => {
  const currentStudentFiles = [
    "btech_2022.json",
    "btech_2023.json",
    "btech_2024.json",
    "btech_2025.json",
    "mtech_2024.json",
    "mtech_2025.json",
  ];

  const alumniFiles = [
    "btech_2021.json",
    "MTech_Alumni_2012___2014_Batch.json",
    "MTech_Alumni_2013___2015_Batch.json",
    "MTech_Alumni_2014___2016_Batch.json",
    "MTech_Alumni_2015___2017_Batch.json",
    "MTech_Alumni_2016___2018_Batch.json",
    "MTech_Alumni_2017___2019_Batch.json",
    "MTech_Alumni_2018___2020_Batch.json",
    "MTech_Alumni_2019___2021_Batch.json",
    "MTech_Alumni_2020___2022_Batch.json",
    "MTech_Alumni_2021___2023_Batch.json",
    "MTech_Alumni_2022___2024_Batch.json",
  ];

  const newData = { btech: [], mtech: [], phd: [], alumni: { btech: [], mtech: [], phd: [] } };

  // --- Load Current Student Files ---
  const studentPromises = currentStudentFiles.map(async (file) => {
    try {
      const res = await fetch(`/department_website/students_excel/${file}`);
      if (!res.ok) return;
      const rows = await res.json();
      const students = rows.map(capitalizeName);

      if (file.startsWith("btech")) {
        const year = parseInt(file.match(/_(\d+)/)[1], 10);
        newData.btech.push({ year, students });
      } else if (file.startsWith("mtech")) {
        const year = parseInt(file.match(/_(\d+)/)[1], 10);
        newData.mtech.push({ year, students });
      }
    } catch (err) {
      console.error(`Error loading student file ${file}:`, err);
    }
  });

  // --- Load Alumni Files ---
  const alumniPromises = alumniFiles.map(async (file) => {
    try {
      const res = await fetch(`/department_website/alumini_excel/${file}`);
      if (!res.ok) return;
      const text = await res.text();
      const sanitizedText = text.replace(/:\s*NaN/g, ":null");
      const rows = JSON.parse(sanitizedText);
      const studentNames = Array.isArray(rows) ? rows.map(row => capitalizeName(row.Name || Object.values(row)[0])) : [];

      if (file.startsWith("btech_")) {
        const yearMatch = file.match(/_(\d{4})/);
        if (yearMatch) newData.alumni.btech.push({ year: parseInt(yearMatch[1], 10), students: studentNames });
      } else if (file.startsWith("MTech_Alumni_")) {
        const yearMatch = file.match(/_(\d{4})___/);
        if (yearMatch) newData.alumni.mtech.push({ year: parseInt(yearMatch[1], 10), students: studentNames });
      }
    } catch (err) {
      console.error(`Error loading alumni file ${file}:`, err);
    }
  });

  // --- Load PhD Data ---
  const loadPhdData = async () => {
    try {
      const res = await fetch(`/department_website/students_excel/phd_all.json`);
      if (!res.ok) return;
      const allPhdStudents = await res.json();

      const onRollStudents = allPhdStudents.filter(s => s.Status === "Onroll");
      const graduatedStudents = allPhdStudents.filter(s => s.Status === "Graduated");

      const phdByYear = onRollStudents.reduce((acc, { Year, Name }) => {
        if (!acc[Year]) acc[Year] = [];
        acc[Year].push(capitalizeName(Name));
        return acc;
      }, {});

      newData.phd = Object.entries(phdByYear).map(([year, students]) => ({ year: parseInt(year, 10), students }));
      newData.alumni.phd = graduatedStudents;
    } catch (err) {
      console.error("Error loading phd_all.json:", err);
    }
  };

  await Promise.all([...studentPromises, ...alumniPromises, loadPhdData()]);

  // --- Sort Data ---
  newData.btech.sort((a, b) => b.year - a.year);
  newData.mtech.sort((a, b) => b.year - a.year);
  newData.phd.sort((a, b) => b.year - a.year);
  newData.alumni.btech.sort((a, b) => b.year - a.year);
  newData.alumni.mtech.sort((a, b) => b.year - a.year);

  return newData;
};