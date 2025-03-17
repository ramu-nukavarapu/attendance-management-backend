import { Enrollment } from "../models/enrollment.model.js"
import { Student } from "../models/student.model.js"

export const addEnrollment = async (req, res) => {
    try {
        const studentinfo = req.body[0]
        const subject = req.body[1]

        const student = await Enrollment.findOne({studentID: studentinfo._id})

        if(!student){
            await Enrollment.create({
                studentID: student._id,
                subjects: subject
            })
            res.status(200).json({message: "enrollment updated successfully."})
        }else{
            await Enrollment.updateOne({studentID: studentinfo._id},
                {
                    $push: {
                        subjects: subject
                    }
                }
            )
            res.status(200).json({message: "enrollment created successfully."})
        }
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
}

export const addBatchEnrollments = async (req, res) => {
    try {
        const studentinfo = req.body[0]
        const subject = req.body[1]
        const status = []
        const students = await Student.find(studentinfo)

        for (const student of students) {
            const enrolledstudent = await Enrollment.find({studentID: student._id})
            if(!enrolledstudent){
                await Enrollment.create({
                    studentID: student._id,
                    subjects: subject
                })
                status.push({name: student.name, message: "enrollment updated successfully."})
            }else{
                await Enrollment.updateOne({studentID: student._id},
                    {
                        $push: {
                            subjects: subject
                        }
                    }
                )
                status.push({name: student.name, message: "enrollment updated successfully."})
            }
        }
        res.status(200).json(status)
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
}

export const addSpecificEnrollments = async (req, res) => {
    try {
        const studentslist = req.body[0]
        const subject = req.body[1]
        const status = []
        const students = []

        for (let student of studentslist) {
            const details = await Student.findOne({regdNo: student.regdNo})
            students.push(details)
        }
        
        for (const student of students) {
            const enrolledstudent = await Enrollment.find({studentID: student._id})
            if(!enrolledstudent){
                await Enrollment.create({
                    studentID: student._id,
                    subjects: subject
                })
                status.push({name: student.name, message: "enrollment updated successfully."})
            }else{
                await Enrollment.updateOne({studentID: student._id},
                    {
                        $push: {
                            subjects: subject
                        }
                    }
                )
                status.push({name: student.name, message: "enrollment updated successfully."})
            }
        }
        res.status(200).json(status)
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
}