import React, { useState, useMemo } from 'react';

// Embedded data from the Excel files
const DEGREE_PLANS = [
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 1, course: "MATH 180", title: "Calculus I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 2, course: "CS 111", title: "Program Design I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 3, course: "ENGL 160", title: "Academic Writing I: Writing in Academic and Public Contexts", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 4, course: "PHYS 141", title: "General Physics I (Mechanics): Science Elective", term: 1, prereqs: [], coreqs: [1], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 5, course: "ENGR 100", title: "Engineering Orientation", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 1 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 6, course: "MATH 181", title: "Calculus II", term: 2, prereqs: [1], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 7, course: "ENGL 161", title: "Academic Writing II: Writing for Inquiry and Research", term: 2, prereqs: [3], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 8, course: "GENED 999", title: "General Education Course", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 9, course: "CS 141", title: "Program Design II", term: 2, prereqs: [2], coreqs: [1], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 10, course: "CS 151", title: "Mathematical Foundations of Computing", term: 2, prereqs: [2], coreqs: [1], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 11, course: "MATH 210", title: "Calculus III", term: 3, prereqs: [6], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 12, course: "CS 211", title: "Programming Practicum", term: 3, prereqs: [9], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 13, course: "PHYS 142", title: "General Physics II (E&M): Science Elective", term: 3, prereqs: [4], coreqs: [6], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 14, course: "GENED 998", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 15, course: "CS 251", title: "Data Structures", term: 3, prereqs: [9, 10], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 16, course: "MATH 310", title: "Applied Linear Algebra", term: 4, prereqs: [11], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 17, course: "CS 261", title: "Machine Organization", term: 4, prereqs: [15], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 18, course: "STAT 381", title: "Applied Statistical Methods I", term: 4, prereqs: [6], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 19, course: "GENED 997", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 20, course: "CS 301", title: "Languages and Automata", term: 4, prereqs: [10, 15], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 21, course: "CS 342", title: "Software Design", term: 5, prereqs: [15], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 22, course: "CS 361", title: "Systems Programming", term: 5, prereqs: [17], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 23, course: "CS 401", title: "Computer Algorithms I", term: 5, prereqs: [20], coreqs: [16], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 24, course: "GENED 996", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 25, course: "CS 4XX", title: "CS Technical Elective", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 26, course: "CS 362", title: "Computer Design", term: 6, prereqs: [17], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 27, course: "CS 4XY", title: "CS Technical Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 28, course: "GENED 995", title: "General Education Course", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 29, course: "GENED 994", title: "General Education Course", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 30, course: "FREE 001", title: "Free Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 31, course: "CS 4XZ", title: "CS Technical Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 32, course: "CS 4XA", title: "CS Technical Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 33, course: "CS 4XB", title: "CS Technical Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 34, course: "GENED 993", title: "General Education Course", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 35, course: "FREE 002", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 36, course: "FREE 003", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 37, course: "CS 4XC", title: "CS Technical Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 38, course: "CS 4XD", title: "CS Technical Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 39, course: "GENED 992", title: "General Education Course", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 40, course: "FREE 004", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 41, course: "FREE 005", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Computer Science", courseId: 42, course: "FREE 006", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 1 },
  // Biological Sciences
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 101, course: "BIOS 100", title: "Biology of Cells and Organisms", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 102, course: "CHEM 122", title: "General Chemistry I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 103, course: "CHEM 123", title: "General Chemistry Lab I", term: 1, prereqs: [], coreqs: [102], strictCoreqs: [], credits: 1 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 104, course: "ENGL 160", title: "Academic Writing I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 105, course: "MATH 180", title: "Calculus I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 106, course: "BIOS 101", title: "Biology of Populations and Communities", term: 2, prereqs: [101], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 107, course: "CHEM 124", title: "General Chemistry II", term: 2, prereqs: [102], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 108, course: "CHEM 125", title: "General Chemistry Lab II", term: 2, prereqs: [103], coreqs: [107], strictCoreqs: [], credits: 1 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 109, course: "ENGL 161", title: "Academic Writing II", term: 2, prereqs: [104], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 110, course: "MATH 181", title: "Calculus II", term: 2, prereqs: [105], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 111, course: "CHEM 232", title: "Organic Chemistry I", term: 3, prereqs: [107], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 112, course: "CHEM 233", title: "Organic Chemistry Lab I", term: 3, prereqs: [108], coreqs: [111], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 113, course: "PHYS 141", title: "General Physics I", term: 3, prereqs: [105], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 114, course: "GENED 999", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 5 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 115, course: "CHEM 234", title: "Organic Chemistry II", term: 4, prereqs: [111], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 116, course: "CHEM 235", title: "Organic Chemistry Lab II", term: 4, prereqs: [112], coreqs: [115], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 117, course: "PHYS 142", title: "General Physics II", term: 4, prereqs: [113], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 118, course: "GENED 998", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 119, course: "STAT 101", title: "Introduction to Statistics", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 120, course: "BIOS 220", title: "Genetics", term: 5, prereqs: [106], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 121, course: "BIOS 221", title: "Genetics Laboratory", term: 5, prereqs: [], coreqs: [120], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 122, course: "CHEM 342", title: "Biochemistry I", term: 5, prereqs: [115], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 123, course: "GENED 997", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 124, course: "GENED 996", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 125, course: "BIOS 3XX", title: "BIOS Elective (300-level)", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 126, course: "BIOS 3XY", title: "BIOS Elective (300-level)", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 127, course: "GENED 995", title: "General Education Course", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 128, course: "GENED 994", title: "General Education Course", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 129, course: "FREE 001", title: "Free Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 130, course: "BIOS 4XX", title: "BIOS Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 131, course: "BIOS 4XY", title: "BIOS Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 132, course: "GENED 993", title: "General Education Course", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 133, course: "FREE 002", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 139, course: "BIOS 4XZ", title: "BIOS Elective (400-level)", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 134, course: "BIOS 4XA", title: "BIOS Elective (400-level)", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 135, course: "GENED 992", title: "General Education Course", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 136, course: "FREE 003", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Biological Sciences", courseId: 137, course: "FREE 004", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 2 },
  // Applied Psychology
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 201, course: "PSCH 100", title: "Introduction to Psychology", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 202, course: "ENGL 160", title: "Academic Writing I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 203, course: "MATH 090", title: "Intermediate Algebra", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 204, course: "GENED 999", title: "General Education Course", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 205, course: "PSCH 210", title: "Theories of Personality", term: 2, prereqs: [201], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 206, course: "ENGL 161", title: "Academic Writing II", term: 2, prereqs: [202], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 207, course: "STAT 101", title: "Introduction to Statistics", term: 2, prereqs: [203], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 208, course: "GENED 998", title: "General Education Course", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 209, course: "BIOS 100", title: "Biology of Cells and Organisms", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 210, course: "PSCH 231", title: "Social Psychology", term: 3, prereqs: [201], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 211, course: "PSCH 242", title: "Introduction to Research in Psychology", term: 3, prereqs: [201, 207], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 212, course: "GENED 997", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 213, course: "GENED 996", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 214, course: "GENED 995", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 215, course: "PSCH 262", title: "Behavioral Neuroscience", term: 4, prereqs: [201], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 216, course: "PSCH 270", title: "Abnormal Psychology", term: 4, prereqs: [201], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 217, course: "PSCH 343", title: "Advanced Research Methods", term: 4, prereqs: [211], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 218, course: "GENED 994", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 219, course: "GENED 993", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 220, course: "PSCH 320", title: "Developmental Psychology", term: 5, prereqs: [201], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 221, course: "PSCH 353", title: "Cognitive Psychology", term: 5, prereqs: [201], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 222, course: "PSCH 3XX", title: "PSCH Elective (300-level)", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 223, course: "GENED 992", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 224, course: "FREE 001", title: "Free Elective", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 225, course: "PSCH 381", title: "Clinical Psychology", term: 6, prereqs: [216], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 226, course: "PSCH 3XY", title: "PSCH Elective (300-level)", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 227, course: "PSCH 3XZ", title: "PSCH Elective (300-level)", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 228, course: "GENED 991", title: "General Education Course", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 229, course: "FREE 002", title: "Free Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 230, course: "PSCH 4XX", title: "PSCH Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 231, course: "PSCH 4XY", title: "PSCH Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 232, course: "PSCH 4XZ", title: "PSCH Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 233, course: "FREE 003", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 234, course: "FREE 004", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 235, course: "PSCH 494", title: "Applied Psychology Capstone", term: 8, prereqs: [217], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 236, course: "PSCH 4XA", title: "PSCH Elective (400-level)", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 237, course: "FREE 005", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Applied Psychology", courseId: 238, course: "FREE 006", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  // Urban Education
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 301, course: "ED 200", title: "Schools and Society", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 302, course: "ENGL 160", title: "Academic Writing I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 303, course: "PSCH 100", title: "Introduction to Psychology", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 304, course: "GENED 999", title: "General Education Course", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 305, course: "GENED 998", title: "General Education Course", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 306, course: "ED 210", title: "History of American Education", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 307, course: "ENGL 161", title: "Academic Writing II", term: 2, prereqs: [302], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 308, course: "PSCH 320", title: "Developmental Psychology", term: 2, prereqs: [303], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 309, course: "GENED 997", title: "General Education Course", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 310, course: "GENED 996", title: "General Education Course", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 311, course: "ED 250", title: "Education in Urban Society", term: 3, prereqs: [301], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 312, course: "ED 260", title: "Education Policy", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 313, course: "MATH 140", title: "College Algebra", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 314, course: "GENED 995", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 315, course: "GENED 994", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 316, course: "ED 300", title: "Curriculum and Instruction", term: 4, prereqs: [311], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 317, course: "ED 310", title: "Multicultural Education", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 318, course: "STAT 101", title: "Introduction to Statistics", term: 4, prereqs: [313], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 319, course: "GENED 993", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 320, course: "GENED 992", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 321, course: "ED 350", title: "Assessment and Evaluation", term: 5, prereqs: [316], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 322, course: "ED 360", title: "Educational Technology", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 323, course: "ED 3XX", title: "ED Elective (300-level)", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 324, course: "GENED 991", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 325, course: "FREE 001", title: "Free Elective", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 326, course: "ED 400", title: "Classroom Management", term: 6, prereqs: [316], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 327, course: "ED 410", title: "Special Education Foundations", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 328, course: "ED 3XY", title: "ED Elective (300-level)", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 329, course: "FREE 002", title: "Free Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 330, course: "FREE 003", title: "Free Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 331, course: "ED 450", title: "Student Teaching Seminar", term: 7, prereqs: [321], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 332, course: "ED 4XX", title: "ED Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 333, course: "ED 4XY", title: "ED Elective (400-level)", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 334, course: "FREE 004", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 335, course: "ED 490", title: "Student Teaching Practicum", term: 8, prereqs: [331], coreqs: [], strictCoreqs: [], credits: 12 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Arts", plan: "Urban Education", courseId: 336, course: "ED 495", title: "Capstone Seminar", term: 8, prereqs: [331], coreqs: [335], strictCoreqs: [], credits: 3 },
  // Real Estate
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 401, course: "ACTG 111", title: "Financial Accounting I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 402, course: "ECON 120", title: "Principles of Microeconomics", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 403, course: "ENGL 160", title: "Academic Writing I", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 404, course: "MATH 160", title: "Finite Mathematics for Business", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 405, course: "GENED 999", title: "General Education Course", term: 1, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 406, course: "ACTG 112", title: "Financial Accounting II", term: 2, prereqs: [401], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 407, course: "ECON 121", title: "Principles of Macroeconomics", term: 2, prereqs: [402], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 408, course: "ENGL 161", title: "Academic Writing II", term: 2, prereqs: [403], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 409, course: "MATH 165", title: "Calculus for Business", term: 2, prereqs: [404], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 410, course: "GENED 998", title: "General Education Course", term: 2, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 411, course: "MGMT 340", title: "Introduction to Organizations", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 412, course: "STAT 261", title: "Statistical Analysis for Business I", term: 3, prereqs: [409], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 413, course: "RE 230", title: "Introduction to Real Estate", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 414, course: "GENED 997", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 415, course: "GENED 996", title: "General Education Course", term: 3, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 416, course: "FIN 300", title: "Introduction to Finance", term: 4, prereqs: [406], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 417, course: "MKTG 360", title: "Marketing Management", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 418, course: "RE 340", title: "Real Estate Law", term: 4, prereqs: [413], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 419, course: "GENED 995", title: "General Education Course", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 420, course: "COMM 101", title: "Business Communication", term: 4, prereqs: [], coreqs: [], strictCoreqs: [], credits: 2 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 421, course: "RE 350", title: "Real Estate Finance", term: 5, prereqs: [416], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 422, course: "RE 360", title: "Real Estate Investment Analysis", term: 5, prereqs: [416], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 423, course: "IDS 355", title: "Operations Management", term: 5, prereqs: [412], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 424, course: "GENED 994", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 425, course: "GENED 993", title: "General Education Course", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 426, course: "FREE 001", title: "Free Elective", term: 5, prereqs: [], coreqs: [], strictCoreqs: [], credits: 1 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 427, course: "RE 410", title: "Real Estate Valuation", term: 6, prereqs: [421], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 428, course: "RE 420", title: "Real Estate Development", term: 6, prereqs: [421], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 429, course: "RE 3XX", title: "RE Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 430, course: "GENED 992", title: "General Education Course", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 431, course: "FREE 002", title: "Free Elective", term: 6, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 432, course: "RE 430", title: "Property Management", term: 7, prereqs: [413], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 433, course: "RE 440", title: "Commercial Real Estate", term: 7, prereqs: [422], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 434, course: "RE 4XX", title: "RE Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 435, course: "FREE 003", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 436, course: "FREE 004", title: "Free Elective", term: 7, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 437, course: "RE 490", title: "Real Estate Capstone", term: 8, prereqs: [427, 428], coreqs: [], strictCoreqs: [], credits: 4 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 438, course: "RE 4XY", title: "RE Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 439, course: "FREE 005", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 3 },
  { institution: "University of Illinois at Chicago", degreeType: "Bachelor of Science", plan: "Real Estate", courseId: 440, course: "FREE 006", title: "Free Elective", term: 8, prereqs: [], coreqs: [], strictCoreqs: [], credits: 4 },
];

// Transfer equivalencies (sample from the data)
const TRANSFER_DATA = [
  { from: "City Colleges of Chicago", source: "CS 201", sourceTitle: "Programming Fundamentals", target: "CS 111", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CS 202", sourceTitle: "Advanced Programming", target: "CS 141", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "MATH 207", sourceTitle: "Calculus I", target: "MATH 180", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "MATH 208", sourceTitle: "Calculus II", target: "MATH 181", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "MATH 209", sourceTitle: "Calculus III", target: "MATH 210", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "ENGL 101", sourceTitle: "English Composition I", target: "ENGL 160", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "ENGL 102", sourceTitle: "English Composition II", target: "ENGL 161", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "PHYS 221", sourceTitle: "Physics: Mechanics", target: "PHYS 141", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "PHYS 222", sourceTitle: "Physics: E&M", target: "PHYS 142", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CHEM 201", sourceTitle: "General Chemistry I", target: "CHEM 122", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CHEM 202", sourceTitle: "General Chemistry II", target: "CHEM 124", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CHEM 203", sourceTitle: "General Chemistry Lab I", target: "CHEM 123", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CHEM 204", sourceTitle: "General Chemistry Lab II", target: "CHEM 125", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CHEM 211", sourceTitle: "Organic Chemistry I", target: "CHEM 232", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CHEM 212", sourceTitle: "Organic Chemistry II", target: "CHEM 234", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "BIOL 121", sourceTitle: "Biology I", target: "BIOS 100", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "BIOL 122", sourceTitle: "Biology II", target: "BIOS 101", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "PSYC 201", sourceTitle: "Introduction to Psychology", target: "PSCH 100", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "PSYC 205", sourceTitle: "Child Development", target: "PSCH 320", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "ECON 201", sourceTitle: "Microeconomics", target: "ECON 120", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "ECON 202", sourceTitle: "Macroeconomics", target: "ECON 121", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "ACCT 101", sourceTitle: "Financial Accounting I", target: "ACTG 111", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "ACCT 102", sourceTitle: "Financial Accounting II", target: "ACTG 112", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "MATH 125", sourceTitle: "Business Calculus", target: "MATH 165", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "STAT 201", sourceTitle: "Statistics", target: "STAT 101", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "EDUC 101", sourceTitle: "Intro to Education", target: "ED 200", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "CS 101", sourceTitle: "Computer Concepts", target: "NO TRANSFER", status: "DOES NOT TRANSFER" },
  { from: "City Colleges of Chicago", source: "ART 101", sourceTitle: "Art Appreciation", target: "GENED", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "HIST 101", sourceTitle: "World History", target: "GENED", status: "TRANSFERS" },
  { from: "City Colleges of Chicago", source: "PHIL 101", sourceTitle: "Introduction to Philosophy", target: "GENED", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Calculus AB", sourceTitle: "AP Calculus AB (Score 4+)", target: "MATH 180", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Calculus BC", sourceTitle: "AP Calculus BC (Score 4+)", target: "MATH 180, MATH 181", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Computer Science A", sourceTitle: "AP CS A (Score 4+)", target: "CS 111", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Physics C: Mech", sourceTitle: "AP Physics C: Mechanics (Score 4+)", target: "PHYS 141", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Chemistry", sourceTitle: "AP Chemistry (Score 4+)", target: "CHEM 122, CHEM 123", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Biology", sourceTitle: "AP Biology (Score 4+)", target: "BIOS 100", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP Psychology", sourceTitle: "AP Psychology (Score 4+)", target: "PSCH 100", status: "TRANSFERS" },
  { from: "Advanced Placement Exam", source: "AP English Lang", sourceTitle: "AP English Language (Score 4+)", target: "ENGL 160", status: "TRANSFERS" },
];

// Icons
const Icons = {
  School: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Book: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Arrow: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
};

// Navigation tabs
const NAV_TABS = [
  { id: 'explore', label: 'Explore Degrees', icon: Icons.Search },
  { id: 'mycourses', label: 'My Courses', icon: Icons.Book },
  { id: 'plan', label: 'My Plan', icon: Icons.Chart },
];

export default function TransferPortal() {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [fromInstitution, setFromInstitution] = useState('City Colleges of Chicago');
  const [myCourses, setMyCourses] = useState([]);
  const [courseInput, setCourseInput] = useState('');
  const [savedPlan, setSavedPlan] = useState(null);

  const plans = useMemo(() => {
    const unique = [...new Set(DEGREE_PLANS.map(c => c.plan))];
    return unique.map(p => {
      const courses = DEGREE_PLANS.filter(c => c.plan === p);
      return {
        name: p,
        degreeType: courses[0].degreeType,
        institution: courses[0].institution,
        totalCredits: courses.reduce((sum, c) => sum + c.credits, 0),
        totalCourses: courses.length,
      };
    });
  }, []);

  const planCourses = useMemo(() => {
    if (!selectedPlan) return [];
    return DEGREE_PLANS.filter(c => c.plan === selectedPlan.name);
  }, [selectedPlan]);

  const coursesByTerm = useMemo(() => {
    const grouped = {};
    planCourses.forEach(course => {
      if (!grouped[course.term]) grouped[course.term] = [];
      grouped[course.term].push(course);
    });
    return grouped;
  }, [planCourses]);

  // Transfer mapping for user's courses
  const transferResults = useMemo(() => {
    return myCourses.map(course => {
      const match = TRANSFER_DATA.find(
        t => t.from === fromInstitution &&
        t.source.toLowerCase() === course.toLowerCase()
      );
      return {
        source: course,
        match: match || null,
      };
    });
  }, [myCourses, fromInstitution]);

  // Calculate what courses are satisfied
  const satisfiedCourses = useMemo(() => {
    const satisfied = new Set();
    transferResults.forEach(result => {
      if (result.match && result.match.status === 'TRANSFERS') {
        const targets = result.match.target.split(',').map(t => t.trim());
        targets.forEach(t => {
          if (t !== 'GENED' && t !== 'NO TRANSFER') {
            satisfied.add(t);
          }
        });
      }
    });
    return satisfied;
  }, [transferResults]);

  // Calculate credits and progress
  const progressStats = useMemo(() => {
    if (!selectedPlan) return null;
    const totalCredits = selectedPlan.totalCredits;
    let completedCredits = 0;
    let completedCourses = 0;

    planCourses.forEach(course => {
      if (satisfiedCourses.has(course.course)) {
        completedCredits += course.credits;
        completedCourses++;
      }
    });

    return {
      totalCredits,
      completedCredits,
      remainingCredits: totalCredits - completedCredits,
      completedCourses,
      totalCourses: planCourses.length,
      percentComplete: Math.round((completedCredits / totalCredits) * 100),
    };
  }, [selectedPlan, planCourses, satisfiedCourses]);

  const addCourse = () => {
    if (courseInput.trim() && !myCourses.includes(courseInput.trim().toUpperCase())) {
      setMyCourses([...myCourses, courseInput.trim().toUpperCase()]);
      setCourseInput('');
    }
  };

  const removeCourse = (course) => {
    setMyCourses(myCourses.filter(c => c !== course));
  };

  const savePlan = () => {
    setSavedPlan({
      degree: selectedPlan,
      courses: myCourses,
      fromInstitution,
      savedAt: new Date().toLocaleString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Icons.School />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">UIC Transfer Pathway Planner</h1>
              <p className="text-sm text-gray-500">Plan your path to University of Illinois at Chicago</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Explore Degrees Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Degree Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map(plan => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      selectedPlan?.name === plan.name
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{plan.name.trim()}</h3>
                        <p className="text-sm text-gray-500 mt-1">{plan.degreeType}</p>
                      </div>
                      {selectedPlan?.name === plan.name && (
                        <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                          <Icons.Check />
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex gap-4 text-sm text-gray-600">
                      <span>{plan.totalCredits} credits</span>
                      <span>{plan.totalCourses} courses</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedPlan && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedPlan.name.trim()}</h2>
                    <p className="text-sm text-gray-500">{selectedPlan.degreeType} • {selectedPlan.totalCredits} total credits</p>
                  </div>
                  {progressStats && progressStats.completedCredits > 0 && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">{progressStats.percentComplete}%</div>
                      <div className="text-sm text-gray-500">completed from transfers</div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {Object.entries(coursesByTerm).map(([term, courses]) => (
                    <div key={term} className="border-l-4 border-indigo-200 pl-4">
                      <h3 className="font-medium text-gray-900 mb-3">
                        {term <= 4 ? `Year ${Math.ceil(term/2)}` : `Year ${Math.ceil(term/2)}`} - {term % 2 === 1 ? 'Fall' : 'Spring'}
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          ({courses.reduce((sum, c) => sum + c.credits, 0)} credits)
                        </span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {courses.map(course => (
                          <div
                            key={course.courseId}
                            className={`p-3 rounded-lg border ${
                              satisfiedCourses.has(course.course)
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-medium text-gray-900">{course.course}</span>
                              <span className="text-xs text-gray-500">{course.credits} cr</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{course.title}</p>
                            {satisfiedCourses.has(course.course) && (
                              <div className="flex items-center gap-1 mt-2 text-green-600 text-xs">
                                <Icons.Check />
                                <span>Satisfied by transfer</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === 'mycourses' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Enter Your Completed Courses</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer From</label>
                <select
                  value={fromInstitution}
                  onChange={(e) => setFromInstitution(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="City Colleges of Chicago">City Colleges of Chicago</option>
                  <option value="Advanced Placement Exam">Advanced Placement Exams</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Course</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCourse()}
                    placeholder="e.g., MATH 207, CS 201"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={addCourse}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Icons.Plus />
                    Add
                  </button>
                </div>
              </div>

              {/* Quick add suggestions */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {TRANSFER_DATA
                    .filter(t => t.from === fromInstitution && !myCourses.includes(t.source))
                    .slice(0, 8)
                    .map(t => (
                      <button
                        key={t.source}
                        onClick={() => setMyCourses([...myCourses, t.source])}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        {t.source}
                      </button>
                    ))}
                </div>
              </div>

              {/* My courses list */}
              {myCourses.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Your Courses ({myCourses.length})</h3>
                  <div className="space-y-2">
                    {myCourses.map(course => (
                      <div key={course} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="font-mono text-sm">{course}</span>
                        <button
                          onClick={() => removeCourse(course)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Transfer Results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Transfer Credit Mapping</h2>

              {transferResults.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Icons.Book />
                  <p className="mt-2">Add courses to see how they transfer to UIC</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transferResults.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        result.match?.status === 'TRANSFERS'
                          ? 'bg-green-50 border-green-200'
                          : result.match?.status === 'DOES NOT TRANSFER'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="font-mono text-sm font-medium">{result.source}</div>
                          {result.match && (
                            <div className="text-sm text-gray-600">{result.match.sourceTitle}</div>
                          )}
                        </div>

                        <Icons.Arrow />

                        <div className="flex-1 text-right">
                          {result.match ? (
                            result.match.status === 'TRANSFERS' ? (
                              <>
                                <div className="font-mono text-sm font-medium text-green-700">
                                  {result.match.target}
                                </div>
                                <div className="flex items-center justify-end gap-1 text-xs text-green-600">
                                  <Icons.Check />
                                  Transfers
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-sm font-medium text-red-700">Does Not Transfer</div>
                                <div className="flex items-center justify-end gap-1 text-xs text-red-600">
                                  <Icons.X />
                                  No equivalent
                                </div>
                              </>
                            )
                          ) : (
                            <>
                              <div className="text-sm font-medium text-yellow-700">Not Found</div>
                              <div className="text-xs text-yellow-600">Check course number</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Summary */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {transferResults.filter(r => r.match?.status === 'TRANSFERS').length}
                        </div>
                        <div className="text-xs text-gray-500">Transfer</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">
                          {transferResults.filter(r => r.match?.status === 'DOES NOT TRANSFER').length}
                        </div>
                        <div className="text-xs text-gray-500">Don't Transfer</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {transferResults.filter(r => !r.match).length}
                        </div>
                        <div className="text-xs text-gray-500">Not Found</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Plan Tab */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            {!selectedPlan ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Chart />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">No Degree Selected</h2>
                <p className="text-gray-500 mb-4">Select a degree program in the Explore tab to build your plan</p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore Degrees
                </button>
              </div>
            ) : (
              <>
                {/* Progress Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{selectedPlan.name.trim()}</h2>
                      <p className="text-sm text-gray-500">{selectedPlan.degreeType}</p>
                    </div>
                    <button
                      onClick={savePlan}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Icons.Save />
                      Save Plan
                    </button>
                  </div>

                  {progressStats && (
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-indigo-600">{progressStats.percentComplete}%</div>
                        <div className="text-sm text-gray-600">Complete</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-green-600">{progressStats.completedCredits}</div>
                        <div className="text-sm text-gray-600">Credits Transferred</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-gray-700">{progressStats.remainingCredits}</div>
                        <div className="text-sm text-gray-600">Credits Remaining</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-blue-600">{progressStats.totalCourses - progressStats.completedCourses}</div>
                        <div className="text-sm text-gray-600">Courses to Take</div>
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  {progressStats && (
                    <div className="mt-6">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                          style={{ width: `${progressStats.percentComplete}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>0 credits</span>
                        <span>{progressStats.totalCredits} credits</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Remaining Courses */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Courses You Still Need</h2>

                  <div className="space-y-4">
                    {Object.entries(coursesByTerm).map(([term, courses]) => {
                      const remainingCourses = courses.filter(c => !satisfiedCourses.has(c.course));
                      if (remainingCourses.length === 0) return null;

                      return (
                        <div key={term} className="border-l-4 border-gray-200 pl-4">
                          <h3 className="font-medium text-gray-700 mb-2">
                            Year {Math.ceil(parseInt(term)/2)} - {parseInt(term) % 2 === 1 ? 'Fall' : 'Spring'}
                          </h3>
                          <div className="grid md:grid-cols-3 gap-2">
                            {remainingCourses.map(course => (
                              <div key={course.courseId} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-sm font-medium">{course.course}</span>
                                  <span className="text-xs text-gray-500">{course.credits} cr</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 truncate">{course.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Saved Plan Confirmation */}
                {savedPlan && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Icons.Check />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800">Plan Saved Successfully</h3>
                        <p className="text-sm text-green-600">Last saved: {savedPlan.savedAt}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>Transfer Pathway Planner - Interactive Prototype</p>
            <p>Data: City Colleges of Chicago → UIC</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
