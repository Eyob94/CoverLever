import { createCompletion } from "../../utils/generateResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { jobTitle, jobDescription, companyName, witty, pdfContent } =
		await request.json();
	const result = await createCompletion(
		pdfContent,
		jobTitle,
		jobDescription,
		companyName,
		witty
	);
	return NextResponse.json({ result });
}
