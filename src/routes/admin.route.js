import express from "express";
import { addFaculty, getFaculty, getSpecificFaculty } from "../controllers/faculty.controller.js";
import { addMultipleStudents, addStudent, batchStudents, getSpecificStudent, getStudents } from "../controllers/student.controller.js";
import { addSubject, addSubjects, getSpecificSubject, getSpecificSubjects, getSubjects } from "../controllers/subject.controller.js";
import { addBatchEnrollments, addEnrollment, addSpecificEnrollments } from "../controllers/enrollment.controller.js";

export const adminRouter = express.Router()

adminRouter.post("/faculty", addFaculty)
adminRouter.get("/faculty", getFaculty)
adminRouter.get("/faculty/:id", getSpecificFaculty)

adminRouter.post("/student", addStudent)
adminRouter.post("/student/batch", addMultipleStudents)
adminRouter.get("/student", getStudents)
adminRouter.get("/student/batch", batchStudents)
adminRouter.get("/student/:id", getSpecificStudent)

adminRouter.post("/subject", addSubject)
adminRouter.post("/subject/batch", addSubjects)
adminRouter.get("/subject", getSubjects)
adminRouter.get("/subject/batch", getSpecificSubjects)
adminRouter.get("/subject/:id", getSpecificSubject)

adminRouter.post("/enroll", addEnrollment)
adminRouter.post("/enroll/batch", addBatchEnrollments)
adminRouter.post("/enroll/specific", addSpecificEnrollments)