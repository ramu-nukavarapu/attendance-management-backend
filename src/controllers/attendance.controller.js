import { Attendance } from "../models/attendance.model.js"
import { Enrollment } from "../models/enrollment.model.js";


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

export const postAttendancebyLab = async (req, res) => {
    try {
        const studentsInfo = req.body;
        const date = new Date().toISOString().split("T")[0];
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);
        const status = [];

        for (const student of studentsInfo) {
            const studentRecord = await Attendance.findOne({
                studentID: student._id,
                date: { $gte: startOfDay, $lt: endOfDay }
            });

            if (studentRecord) {
                // Update attendance for multiple lab periods
                await Attendance.updateOne(
                    { studentID: student._id },
                    {
                        $push: {
                            faculty: student.faculty,
                            periodStatus: { $each: student.periodStatus } // Array of periods
                        }
                    }
                );
            } else {
                // Create new attendance entry for the student
                await Attendance.create({
                    studentID: student._id,
                    faculty: student.faculty,
                    periodStatus: student.periodStatus, // Array of periods
                    date: Date.now()
                });
            }

            status.push({
                name: student.name,
                status: student.periodStatus.map(p => p.status), // Array of statuses
                message: "Successfully posted lab attendance."
            });
        }

        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const postAttendancebySubject = async (req, res) => {
    try {
        const { subjectID, faculty, periodStatus } = req.body;
        if (!subjectID || !faculty || !periodStatus) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const date = new Date().toISOString().split("T")[0];
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        // Find students enrolled in the given subject
        const enrolledStudents = await Enrollment.find({ "subjects.subjectID": subjectID }).populate("studentID");

        if (enrolledStudents.length === 0) {
            return res.status(404).json({ message: "No students found for this subject" });
        }

        const status = [];

        for (const enrollment of enrolledStudents) {
            const student = enrollment.studentID;

            // Check if attendance already exists for this student & subject on the same day
            const studentRecord = await Attendance.findOne({
                studentID: student._id,
                date: { $gte: startOfDay, $lt: endOfDay }
            });

            if (studentRecord) {
                // Update existing attendance
                await Attendance.updateOne(
                    {
                        studentID: student._id,
                        date: { $gte: startOfDay, $lt: endOfDay }
                    },
                    {
                        $push: {
                            faculty: faculty,
                            periodStatus: periodStatus
                        }
                    }
                );
            } else {
                // Create new attendance record
                await Attendance.create({
                    studentID: student._id,
                    subjectID: subjectID,
                    faculty: faculty,
                    periodStatus: periodStatus,
                    date: Date.now()
                });
            }

            status.push({
                name: student.name,
                studentID: student._id,
                subjectID: subjectID,
                status: periodStatus.status,
                message: "Attendance recorded successfully"
            });
        }

        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getOverallAttendance = async (req, res) => {
    
}



export const getAttendanceByDay = async (req, res) => {
    try {
        const { studentID, date } = req.body;

        if (!studentID || !date) {
            return res.status(400).json({ message: "Missing required fields: studentID and date" });
        }

        // Convert date to match MongoDB date range format
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        // Find all attendance records for the student on the given day
        const attendanceRecords = await Attendance.findOne({
            studentID: studentID,
            date: { $gte: startOfDay, $lt: endOfDay }
        }).populate("subjectID", "name"); // Populating subject name
        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this student on the given date" });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAttendanceByWeek = async (req, res) => {
    try {
        const { studentID, startDate } = req.body;

        if (!studentID || !startDate) {
            return res.status(400).json({ message: "Missing required fields: studentID and startDate" });
        }

        // Convert startDate to Date object
        const start = new Date(startDate);
        if (isNaN(start)) {
            return res.status(400).json({ message: "Invalid startDate format. Use YYYY-MM-DD" });
        }

        // Calculate end of the week (7 days from startDate)
        const end = new Date(start);
        end.setDate(start.getDate() + 6); // Adding 6 days to cover a full week

        // Fetch attendance records for the student within the week
        const attendanceRecords = await Attendance.find({
            studentID: studentID,
            date: { $gte: start, $lt: end }
        }).populate("subjectID", "name"); // Populate subject details

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this student in the given week" });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAttendanceByMonth = async (req, res) => {
    try {
        const { studentID, year, month } = req.query;

        if (!studentID || !year || !month) {
            return res.status(400).json({ message: "Missing required fields: studentID, year, and month" });
        }

        // Convert year and month to numbers
        const numericYear = parseInt(year);
        const numericMonth = parseInt(month);

        if (isNaN(numericYear) || isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
            return res.status(400).json({ message: "Invalid year or month. Use format: year=YYYY, month=MM (1-12)" });
        }

        // Get first and last day of the month
        const startOfMonth = new Date(numericYear, numericMonth - 1, 1);
        const endOfMonth = new Date(numericYear, numericMonth, 0); // Last day of the month

        // Fetch attendance records for the student within the month
        const attendanceRecords = await Attendance.find({
            studentID: studentID,
            date: { $gte: startOfMonth, $lt: endOfMonth }
        }).populate("subjectID", "name"); // Populate subject details

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this student in the given month" });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAttendanceBySemester = async (req, res) => {
    try {
        const { studentID, startDate, endDate } = req.query;

        if (!studentID || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required fields: studentID, startDate, and endDate" });
        }

        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
        }

        // Ensure the start date is before the end date
        if (start > end) {
            return res.status(400).json({ message: "startDate must be before endDate" });
        }

        // Fetch attendance records for the student within the semester range
        const attendanceRecords = await Attendance.find({
            studentID: studentID,
            date: { $gte: start, $lte: end }
        }).populate("subjectID", "name"); // Populate subject details

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this student in the given semester" });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
