const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

async function gengerateInterviewReportController(req, res){
    try{
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated succesfully",
            interviewReport
        })
    }catch(error){
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function getInterviewReportByIdController(req, res){
    try {
        const { interviewId } = req.params
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if(!interviewReport){
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        res.status(200).json({
            message: 'Interview report fetched succesfully',
            interviewReport
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function getAllInterviewReportsController(req, res){
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan')

        if(!interviewReports){
             return res.status(404).json({
                message: "There is no interview report yet"
            })
        }

        res.status(200).json({
            message: 'Interview reports fetched succesfully',
            interviewReports
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = {
    gengerateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
}