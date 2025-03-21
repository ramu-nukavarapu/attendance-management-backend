import express from "express";
import { postAttendancebyClass, postAttendancebyLab, postAttendancebySubject } from "../controllers/attendance.controller.js";

export const facultyRouter = express.Router()

facultyRouter.post("/attendance/class", postAttendancebyClass)
facultyRouter.post("/attendance/lab", postAttendancebyLab)
facultyRouter.post("/attendance/subject", postAttendancebySubject)