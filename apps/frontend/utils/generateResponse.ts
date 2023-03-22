import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const gptConfig = {
  completeCoverLetter: `You are a cover letter generator.
You will be given a job description along with the job applicant's resume, and the company receiving the job application.
You will write a cover letter for the applicant that matches their past experiences from the resume with the job description.
Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job, making him seem overqualified for the job.
You will write the cover letter with the given tone`,
  coverLetterWithAWittyRemark: `You are a cover letter generator.
You will be given a job description along with the job applicant's resume and the company receiving the job application.
You will write a cover letter for the applicant that matches their past experiences from the resume with the job description.
Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job, making him seem overqualified for the job.
You will write the cover letter with the given tone
Include a job related joke at the end of the cover letter.`,
  ideasForCoverLetter:
    "You are a cover letter idea generator. You will be given a job description along with the job applicant's resume and the company receiving the job application. You will generate a bullet point list of ideas for the applicant to use in their cover letter. ",
};

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

export const createCompletion = async ({
  resume,
  jobTitle,
  jobDescription,
  witty,
  toneValue,
  companyName,
}) => {
  try {
    console.log(witty);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: witty
            ? gptConfig.coverLetterWithAWittyRemark
            : gptConfig.completeCoverLetter,
        },
        {
          role: 'user',
          content: `My Resume: ${resume}. Job title: ${jobTitle} Job Description:${jobDescription} Company Applying for:${companyName} tone:${toneValue}`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });
    console.log(completion.data.choices);
    return completion.data.choices[0];
  } catch (e) {
    console.log(e.message);
    return e;
  }
};
