import express from "express";
import env from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.config.js";
import { superAdminRouter } from "./routes/superadmin.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { facultyRouter } from "./routes/faculty.route.js";

env.config()
connectDB()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(superAdminRouter)
app.use(adminRouter)
app.use(facultyRouter)

app.get("/", (req,res)=>{
    res.status(200).json({message: "Hello from server."})
})

app.listen(PORT, ()=> console.log(`app listening from http://localhost:${PORT}`))
