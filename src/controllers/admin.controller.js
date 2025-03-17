import { Admin } from "../models/admin.model.js"
import { User } from "../models/user.model.js"
import { hashPassword } from "../services/password.service.js"

export const addAdmin = async (req, res) => {
    try{
        const email = req.body.email
        const password = email.split("@")[0]
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

        const admin = await Admin.create({
            name,
            department,
            email,
            phoneNo,
            userID: user._id
        })
        if (!admin) {
            return res.status(500).json({message: "Something went wrong."})
        }

        res.status(200).json({message: "Admin created successfully."})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find()
        if (admins.length == 0) {
            return res.status(200).json({message: "No admin found."})
        }
        res.status(200).json(admins)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getSpecificAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findOne({_id: id})
        if (!admin) {
            return res.status(200).json({message: "No admin found."})
        }
        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}