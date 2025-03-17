import express from "express";
import { addAdmin, getAdmin, getSpecificAdmin } from "../controllers/admin.controller.js";

export const superAdminRouter = express.Router()

superAdminRouter.post("/admin", addAdmin)
superAdminRouter.get("/admin", getAdmin)
superAdminRouter.get("/admin/:id", getSpecificAdmin)