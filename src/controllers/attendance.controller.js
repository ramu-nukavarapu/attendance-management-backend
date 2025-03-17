import { Attendance } from "../models/attendance.model.js"

export const postAttendancebyClass = async(req, res)=>{
    try{
        const studentsinfo = req.body
        const date = new Date().toISOString().split("T")[0];
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const status = []

        for (const student of studentsinfo) {
            const studentRecord = await Attendance.findOne({studentID: student._id, date: {$gte: startOfDay, $lt: endOfDay} })
            if (studentRecord) {
                await Attendance.updateOne({studentID: student._id}, {
                    $push: {
                        faculty: student.faculty,
                        periodStatus: student.periodStatus
                    }
                })
            } else {
                await Attendance.create({
                    studentID: student._id,
                    faculty: student.faculty,
                    periodStatus: student.periodStatus,
                    date: Date.now()
                })
            }
            status.push({name: student.name, status: student.periodStatus.status, message: "successfully posted."})
        }

        res.status(200).json(status)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const postAttendancebyLab = async(req, res)=>{
    try{
        const studentsinfo = req.body
        const date = new Date().toISOString().split("T")[0];
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const status = []

        for (const student of studentsinfo) {
            const studentRecord = await Attendance.findOne({studentID: student._id, date: {$gte: startOfDay, $lt: endOfDay} })
            if (studentRecord) {
                await Attendance.updateOne({studentID: student._id}, {
                    $push: {
                        faculty: student.faculty,
                        periodStatus: student.periodStatus
                    }
                })
            } else {
                await Attendance.create({
                    studentID: student._id,
                    faculty: student.faculty,
                    periodStatus: student.periodStatus,
                    date: Date.now()
                })
            }
            status.push({name: student.name, status: student.periodStatus.status, message: "successfully posted."})
        }

        res.status(200).json(status)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const postAttendancebySubject = async (req, res) => {
    
}

export const getOverallAttendance = async (req, res) => {
    
}

export const getAttendanceByWeek = async (req, res) => {
    
}

export const getAttendanceByMonth = async (req, res) => {
    
}

export const getAttendanceBySemester = async (req, res) => {
    
}