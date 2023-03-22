import { createCompletion } from '../../utils/generateResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const {
    jobTitle,
    jobDescription,
    companyName,
    witty,
    pdfContent,
    toneValue,
  } = requestBody;

  console.log(requestBody);

  const result = await createCompletion({
    resume: pdfContent,
    jobTitle,
    jobDescription,
    companyName,
    witty,
    toneValue,
  });
  return NextResponse.json({ result });
}
