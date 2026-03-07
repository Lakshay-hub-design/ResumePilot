const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const interviewReportController = require('../controllers/interview.controller')
const upload = require('../middleware/file.middleware')

const router = express.Router()

router.post('/', authMiddleware.authUser, upload.single("resume"), interviewReportController.gengerateInterviewReportController)
router.get('/report/:interviewId', authMiddleware.authUser, interviewReportController.getInterviewReportByIdController)
router.get('/', authMiddleware.authUser, interviewReportController.getAllInterviewReportsController)

module.exports = router