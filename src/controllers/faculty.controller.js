import { Faculty } from "../models/faculty.model.js"
import { User } from "../models/user.model.js"
import { hashPassword } from "../services/password.service.js"

export const addFaculty = async (req, res) => {
    try{
        const email = req.body.email
        const password = email?.split("@")[0]
        const hashedPassword = await hashPassword(password+"@123")
        const role = req.body.role
        const {name, department, phoneNo} = req.body

        const user = await User.create({
            email,
            password: hashedPassword,
            role
        })
        if (!user) {
            return res.status(500).json({message: "Something went wrong."})
        }

        const faculty = await Faculty.create({
            name,
            department,
            email,
            phoneNo,
            userID: user._id
        })
        if (!faculty) {
            return res.status(500).json({message: "Something went wrong."})
        }

        res.status(200).json({message: "Faculty created successfully."})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const getFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find()
        if (faculties.length == 0) {
            return res.status(200).json({message: "No faculty found."})
        }
        res.status(200).json(faculties)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getSpecificFaculty = async (req, res) => {
    try {
        const id = req.params.id
        const faculty = await Faculty.findOne({_id: id})
        if (!faculty) {
            return res.status(200).json({message: "No faculty found."})
        }
        res.status(200).json(faculty)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}