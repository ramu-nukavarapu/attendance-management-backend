import { Student } from "../models/student.model.js"
import { User } from "../models/user.model.js"
import { hashPassword } from "../services/password.service.js"

export const addStudent = async (req, res) => {
    try{
        const email = req.body.email
        const password = email?.split("@")[0]
        const hashedPassword = await hashPassword(password+"@123")
        const role = req.body.role
        const {name, department, regdNo, regulation, section, year, semester} = req.body
        const phoneNo = req.body.phoneNo || ""

        const user = await User.create({
            email,
            password: hashedPassword,
            role
        })
        if (!user) {
            return res.status(500).json({message: "Something went wrong."})
        }

        const student = await Student.create({
            name,
            department,
            email,
            phoneNo,
            regdNo,
            regulation,
            section,
            year,
            semester,
            userID: user._id
        })
        if (!student) {
            return res.status(500).json({message: "Something went wrong."})
        }

        res.status(200).json({message: "Student created successfully."})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const addMultipleStudents = async (req, res) => {
    const students = req.body
    const status = []
    for (const student of students) {
        try{
            const email = student.email
            const password = email?.split("@")[0]
            const hashedPassword = await hashPassword(password+"@123")
            const role = student.role
            const {name, department, regdNo, regulation, section, year, semester} = student
            const phoneNo = student.phoneNo || ""
    
            const user = await User.create({
                email,
                password: hashedPassword,
                role
            })
            if (!user) {
                status.push({email: email, message: "Something went wrong."})
            }
    
            const newStudent = await Student.create({
                name,
                department,
                email,
                phoneNo,
                regdNo,
                regulation,
                section,
                year,
                semester,
                userID: user._id
            })
            if (!newStudent) {
                status.push({email: email, message: "Something went wrong."})
            }
    
            status.push({email: email, message: "Student created successfully."})
        }catch(err){
            status.push({message: err.message})
        }
    }
    res.status(200).json(status)
}

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
        if (students.length == 0) {
            return res.status(200).json({message: "No student found."})
        }
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getSpecificStudent = async (req, res) => {
    try {
        const id = req.params.id
        const student = await Student.findOne({_id: id})
        if (!student) {
            return res.status(200).json({message: "No student found."})
        }
        res.status(200).json(student)
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}

export const batchStudents = async (req, res) => {
    try {
        const students = await Student.find(req.body)
        if (students.length  == 0) {
            return res.status(200).json({message: "no student found."})
        }
        res.status(200).json(students)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}