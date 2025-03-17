import express from "express";
import { postAttendancebyClass } from "../controllers/attendance.controller.js";

export const facultyRouter = express.Router()

facultyRouter.post("/attendance/class", postAttendancebyClass)
facultyRouter.post("/attendance/lab")
facultyRouter.post("/attendance/subject")