import { Subject } from "../models/subject.model.js"

export const addSubject = async (req, res) => {
    try {
        const {name, subjectID, type, department, semester} = req.body

        await Subject.create({
            name,
            subjectID,
            type,
            department,
            semester
        })
        res.status(200).json({message: "course added successfully."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const addSubjects = async (req, res) => {
    const subjects = req.body
    const status = []
    try {
        for(const subject of subjects){
            const {name, subjectID, type, department, semester} = subject
    
            await Subject.create({
                name,
                subjectID,
                type,
                department,
                semester
            })
            status.push({name: name, message: "subject added successfully."})
    
            status.push({message: error.message})
        }
        res.status(200).json(status) 
    } catch (error) {
        res.status(500).json({message: "something went wrong."})   
    }
}

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
        if (subjects.length == 0) {
            res.status(400).json({message: "no subject found."})
        }
        res.status(200).json(subjects)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSpecificSubjects = async (req, res)=> {
    try {
        const subject = await Subject.find(req.body)
        if (!subject) {
            res.status(400).json({message: "no subject found."})
        }
        res.status(200).json(subject)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSpecificSubject = async (req, res)=> {
    const id = req.params.id
    try {
        const subject = await Subject.find({_id: id})
        if (!subject) {
            res.status(400).json({message: "no subject found."})
        }
        res.status(200).json(subject)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}