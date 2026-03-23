# Product Requirement Document (PRD)

## Project Title

AI Resume Analyzer

## Created By

Archita Garg

## Date

March 2026

---

# 1. Objective

This project aims to build a web application where users can upload their resumes and receive intelligent feedback. The system will analyze the resume to extract skills, calculate a score, and provide suggestions for improvement.

The goal is to help students and job seekers improve their resumes using AI-integrated analysis.

---

# 2. Target Users

* College students
* Freshers
* Internship seekers
* Job applicants

---

# 3. Core Features

## 3.1 Resume Upload

* Users can upload their resume in PDF format
* File will be temporarily stored on the server

---

## 3.2 Text Extraction

* Extract text from uploaded PDF
* Clean and process the text for analysis

---

## 3.3 Skill Detection

* Detect predefined technical skills such as:

  * C++
  * Java
  * Python
  * React
  * Node.js
* Display detected skills to the user

---

## 3.4 Resume Scoring

* Resume will be scored based on:

  * Presence of technical skills
  * Presence of "Projects" section
  * Presence of "Education" section
  * Overall content length

Output: Score between 0–100

---

## 3.5 Suggestions Engine

* Provide suggestions such as:

  * Add more technical skills
  * Include project details
  * Improve formatting
  * Add measurable achievements

---

## 3.6 Result Display

* Display:

  * Extracted skills
  * Resume score
  * Improvement suggestions

---

# 4. AI Logic (Phased Approach)

## Phase 1 (Current)

* Rule-based logic
* Keyword matching for skills and sections

---

## Phase 2 (Upgrade)

* Basic NLP for better text understanding
* Improved suggestions

---

## Phase 3 (Advanced)

* Machine Learning model for scoring
* Job role prediction based on resume
* AI-based feedback system

---

# 5. System Architecture

Frontend (HTML/CSS/JS)
↓
Backend (Node.js + Express)
↓
Processing Layer (Text Extraction + Analysis Logic)

---

# 6. Tech Stack

* Backend: Node.js, Express
* File Upload: Multer
* PDF Parsing: pdf-parse
* Frontend: HTML, CSS, JavaScript

---

# 7. User Flow

1. User opens the web application
2. Uploads resume (PDF)
3. Server receives and processes file
4. Text is extracted from resume
5. Resume is analyzed
6. Results are displayed

---

# 8. Functional Requirements

* Upload PDF file
* Extract text successfully
* Detect at least 5 predefined skills
* Generate resume score
* Provide improvement suggestions

---

# 9. Non-Functional Requirements

* Fast response time (under 3 seconds)
* Simple and user-friendly UI
* No permanent data storage (initial version)

---

# 10. Edge Cases

* Empty resume file
* Unsupported file format
* Corrupted PDF
* Resume with no detectable skills

---

# 11. Future Enhancements

* User authentication (login/signup)
* Resume history tracking
* Downloadable analysis report (PDF)
* Dark mode UI
* AI chatbot for resume feedback
* Job matching system
* ATS score simulation

---

# 12. Project Milestones

| Phase | Task               |
| ----- | ------------------ |
| 1     | Backend setup      |
| 2     | File upload system |
| 3     | Text extraction    |
| 4     | Skill detection    |
| 5     | Resume scoring     |
| 6     | Suggestions system |
| 7     | UI improvements    |

---

# 13. Expected Output Example

```json
{
  "skills": ["Python", "React"],
  "score": 70,
  "suggestions": [
    "Add more technical skills",
    "Include project section"
  ]
}
```

---

# Conclusion

This project demonstrates the integration of web development and AI concepts to solve a real-world problem. It provides a strong foundation for further enhancements using machine learning and advanced NLP techniques.
