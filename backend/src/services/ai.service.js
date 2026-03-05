const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe('The match score between candidate and job description, represented as a percentage.'),
    technicalQuestions: z.array(z.object({
        question: z.string().describe('The technical question can be asked in the interview.'),
        intention: z.string().describe('The intention of interviewer behind asking this question.'),
        answer: z.string().describe('How to answer this question, what points to be cover, what approach to be used.'),
    })).describe('Technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them.'),
    behaviouralQuestions: z.array(z.object({
        question: z.string().describe('The technical question can be asked in the interview.'),
        intention: z.string().describe('The intention of interviewer behind asking this question.'),
        answer: z.string().describe('How to answer this question, what points to be cover, what approach to be used.'),
    })).describe('Behavioural questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them.'),
    skillGaps: z.array(z.object({
        skill: z.string().describe('The skill in which candidate is lacking.'),
        severity: z.enum(['low', 'medium', 'high']).describe('The severity of the skill gap.'),
    })).describe('The skill gaps that candidate needs to work on, along with the severity of those skill gaps.'),
    preparationPlan: z.array(z.object({
        day: z.number().describe('The day of the preparation plan.'),
        focus: z.string().describe('The focus of the preparation plan for that day.'),
        tasks: z.array(z.string()).describe('The tasks that candidate needs to do on that day to prepare for the interview.'),
    })).describe('A day-wise preparation plan for the candidate to prepare for the interview, based on the technical questions, behavioural questions, and skill gaps identified.'),
})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {
    
    const prompt = `
        You are an AI interview assistant.

        Analyze the candidate and generate a structured interview report.

        You MUST return the response strictly in JSON format following the provided schema.

        Candidate Resume:
        ${resume}

        Self Description:
        ${selfDescription}

        Job Description:
        ${jobDescription}
        `

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "Return only valid JSON matching the provided schema.",
            responseMimeType: 'application/json',
            responseSchema: interviewReportSchema
        }
    })

    console.log(response.text)
}

module.exports = generateInterviewReport;