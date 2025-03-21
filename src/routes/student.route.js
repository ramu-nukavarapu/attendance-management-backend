import express from "express";
import { getAttendanceByDay, getAttendanceByMonth, getAttendanceBySemester, getAttendanceByWeek } from "../controllers/attendance.controller.js";

export const studentRouter = express.Router()

studentRouter.get("/attendance/day", getAttendanceByDay)
studentRouter.get("/attendance/week", getAttendanceByWeek)
studentRouter.get("/attendance/month", getAttendanceByMonth)
studentRouter.get("/attendance/sem", getAttendanceBySemester)

studentRouter.get("/notifications")