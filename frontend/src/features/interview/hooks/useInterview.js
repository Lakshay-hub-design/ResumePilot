import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api"
import { useParams } from "react-router"

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

    useEffect(() => {
      if(interviewId){
        getReportById(interviewId)
      }else{
        getAllReports()
      }
    }, [interviewId])
    

    return { loading, report, reports, generateReport, getReportById, getAllReports }
}