import { Semester } from "../models/semester.model.js"

export const addSemesterInfo = async(req, res) =>{
    try {
        const {regulation, semester, startDate, endDate} = req.body
        const status = await Semester.create({
            regulation,
            semester,
            startDate,
            endDate
        })

        if (!status) {
            res.status(400).json({message: "something went wrong."})
        } else {
            res.status(200).json({message: "semester added successfully."})
        }
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
}