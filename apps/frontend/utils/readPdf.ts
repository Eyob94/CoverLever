import { ChangeEvent } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

export async function readCV(
	event: ChangeEvent<HTMLInputElement>
): Promise<string | void> {
	return new Promise((resolve, reject) => {
		console.log("reading pdf ....");
		if (event.target.files == null) {
			throw new Error("Please choose a file");
		}
		if (event.target.files?.[0]?.type != "application/pdf") {
			throw new Error("File chosen is not a PDF");
		}

		let PDFtxt = "";

		const file = event.target.files[0];

		const fileReader = new FileReader();

		fileReader.onload = (e) => {
			console.log(e.target.result);

			if (
				e.target?.result == null ||
				!(e.target?.result instanceof ArrayBuffer)
			) {
				throw new Error("something wen't wrong");
			}

			const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);

			pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
			const loadingtask = pdfjsLib.getDocument(typedarray);

			let textBuilder = "";
			loadingtask.promise
				.then(async (pdf) => {
					for (let i = 1; i <= pdf.numPages; i++) {
						const page = await pdf.getPage(i);
						const content = await page.getTextContent();
						const text = content.items
							.map((item: any) => {
								if (item.str) {
									return item.str;
								}
								return "";
							})
							.join(" ");
						textBuilder += text;
					}

					PDFtxt = textBuilder;
					console.log(PDFtxt);
					return resolve(PDFtxt);
				})
				.catch((e) => {
					reject(e);
				});
		};

		fileReader.readAsArrayBuffer(file);
	});
}
