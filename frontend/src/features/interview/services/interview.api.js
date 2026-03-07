import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) => {
    const formData = new FormData()

    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)
    formData.append('resume', resumeFile)

    const res = await api.post('/api/interview', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return res.data
}

export const getInterviewReportById = async (interviewId) => {
    const res = await api.get(`/api/interview/report/${interviewId}`)

    return res.data
}


export const getAllInterviewReports = async () => {
    const res = await api.get(`/api/interview/`)

    return res.data
}