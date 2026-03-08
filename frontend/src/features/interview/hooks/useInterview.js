import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, generateResumePdf, getAllInterviewReports, getInterviewReportById } from "../services/interview.api"
import { useParams } from "react-router"
import { useState } from "react"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        try {
            setLoading(true)
            const res = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(res.interviewReport)
            return res.interviewReport
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
       try {
            setLoading(true)
            const res = await getInterviewReportById(interviewId)
            setReport(res.interviewReport)
       } catch (error) {
            console.error(error)
       }finally{
        setLoading(false)
       }
    }

    const getAllReports = async () =>{
        try {
            setLoading(true)
            const res = await getAllInterviewReports()
            setReports(res.interviewReports)
            return res.interviewReports
        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        try {
            setLoading(true)
            const response = await generateResumePdf(interviewReportId)
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf "}))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      if(interviewId){
        getReportById(interviewId)
      }else{
        getAllReports()
      }
    }, [interviewId])
    

    return { loading, report, reports, generateReport, getReportById, getAllReports, getResumePdf }
}