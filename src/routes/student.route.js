import express from "express";

export const studentRouter = express.Router()

studentRouter.get("/attendance")
studentRouter.get("/attendance/week")
studentRouter.get("/attendance/month")
studentRouter.get("/attendance/sem")

studentRouter.get("/notifications")