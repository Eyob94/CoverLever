"use client";

import {
	Box,
	Button,
	Card,
	CardHeader,
	Center,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Icon,
	Text,
	Textarea,
	useRadioGroup,
} from "@chakra-ui/react";
import InputComponent from "./InputComponent";
import RadioCard from "./RadioCard";

import { useForm } from "react-hook-form";
import { readCV } from "../../utils/readPdf";
import { useState } from "react";

const options = [
	{
		id: 1,
		name: "Professional & friendly",
	},
	{
		id: 2,
		name: "Formal & humble",
	},
	{
		id: 3,
		name: "Who the heck reads cover letter anyways?",
	},
];

const Form = () => {
	const [pdfContent, setPDFContent] = useState<string>("");
	const [emptyFile, setEmptyFile] = useState<boolean>(false);
	const [pdfError, setPDFError] = useState<string | null>(null);

	const {
		getRootProps,
		getRadioProps,
		value: toneValue,
	} = useRadioGroup({
		name: "Tone",
		defaultValue: options[0].name,
		onChange: console.log,
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const group = getRootProps();

	return (
		<Card p={8} rounded="3xl" variant="elevated" bg="#FBFBFB">
			<CardHeader px={0} pt={0}>
				<Text fontWeight={500} fontSize="xl">
					Job Details
				</Text>
			</CardHeader>
			<form
				onSubmit={handleSubmit((data) => {
					if (!pdfContent) {
						setEmptyFile(true);
						return;
					}
					const requestBody = { toneValue, pdfContent, ...data };

					console.log(requestBody);
				})}
			>
				<Flex direction={"column"} gap={6}>
					<HStack>
						<InputComponent
							label="Job Title"
							type="text"
							required={true}
							register={register}
							name="jobTitle"
						/>
						<InputComponent
							label="Company Name"
							type="text"
							required={false}
							register={register}
							name="companyName"
						/>
					</HStack>
					<FormControl height="300px" overflowY={"hidden"}>
						<FormLabel>Job Description</FormLabel>
						<Textarea
							rounded="lg"
							bg="white"
							height="236px"
							resize="none"
							required
							style={{
								borderColor: errors.jobDescription ? "red" : "",
							}}
							{...register("jobDescription", {
								required: "Field is required",
							})}
						/>
					</FormControl>
					<FormControl height="300px" overflow={"hidden"}>
						<FormLabel>Your Information</FormLabel>
						<input
							type="file"
							hidden
							id="fileUpload"
							onChange={async (e) => {
								try {
									readCV(e).then((res) => {
										setPDFContent(res as string | "");
										console.log("done");
										setPDFError(null);
										setEmptyFile(false);
									});
								} catch (e) {
									console.log(e.message);
									setPDFError(e.message);
								}
							}}
						/>
						<FormLabel
							htmlFor="fileUpload"
							rounded="lg"
							bg="gray.50"
							height="236px"
							resize="none"
							border="4px dashed #E2E8F0"
							py={10}
							cursor="pointer"
							style={{
								borderColor: emptyFile || pdfError ? "red" : "",
							}}
						>
							<Flex direction="column" align={"center"} gap={2}>
								<Icon viewBox="0 0 72 58" boxSize={20}>
									<path
										d="M33.596 42.0766L33.5815 55.5811C33.5793 56.9151 34.6551 57.9978 35.9805 58C37.3059 58.0022 38.3817 56.9195 38.3839 55.5855L38.3983 42.0907L41.4861 45.2061C42.4225 46.1512 43.9425 46.1533 44.8815 45.2109C45.8206 44.2685 45.8227 42.7387 44.8863 41.7935L37.7021 34.5434C37.2508 34.0892 36.6409 33.833 36.0047 33.833C35.3685 33.833 34.7559 34.0865 34.3073 34.5386L27.0844 41.7887C26.1454 42.7311 26.1432 44.2609 27.0796 45.2061C28.0159 46.1512 29.5359 46.1533 30.475 45.2109L33.5965 42.0762L33.596 42.0766ZM59.8402 24.3435C59.941 23.4928 59.994 22.6275 59.994 21.7504C59.994 9.74667 50.31 0 38.3834 0C37.4615 0 36.5535 0.0582611 35.6628 0.171546C34.3491 0.33823 33.4154 1.54659 33.581 2.87094C33.7466 4.19527 34.9499 5.13285 36.2631 4.96617C36.9572 4.87931 37.6652 4.83346 38.3834 4.83346C47.6591 4.83346 55.1917 12.4148 55.1917 21.7505C55.1917 23.215 55.0067 24.6386 54.6584 25.9942C54.4665 26.7386 54.6391 27.5311 55.122 28.1256C55.6044 28.7228 56.3392 29.0513 57.103 29.0125C57.2665 29.0054 57.4294 29.0006 57.5929 29.0006C62.8949 29.0006 67.1976 33.3312 67.1976 38.6674C67.1976 44.0037 62.8949 48.3343 57.5929 48.3343H52.7905C51.4651 48.3343 50.3894 49.4169 50.3894 50.751C50.3894 52.085 51.4651 53.1677 52.7905 53.1677H57.5929C65.543 53.1677 72 46.669 72 38.6674C72 31.434 66.727 25.431 59.8403 24.3439L59.8402 24.3435ZM17.2981 16.9703C7.68858 17.335 0 25.3009 0 35.0611C0 45.0543 8.06331 53.1671 17.9924 53.1671H20.3742C21.6997 53.1671 22.7754 52.0845 22.7754 50.7504C22.7754 49.4164 21.6997 48.3337 20.3742 48.3337H17.9924C10.7122 48.3337 4.8025 42.3864 4.8025 35.0613C4.8025 27.7339 10.7116 21.786 17.9924 21.786C18.3692 21.786 18.7417 21.8028 19.1088 21.8346C20.3984 21.9436 21.5412 21.0055 21.695 19.7151C21.8751 18.2095 22.2519 16.7643 22.7969 15.4086C23.2938 14.1711 22.7032 12.7621 21.4742 12.2599C20.2473 11.7598 18.8447 12.3564 18.3478 13.5912C17.911 14.6766 17.5578 15.805 17.2984 16.9698L17.2981 16.9703ZM25.7864 4.07969C25.2005 4.50477 24.634 4.95683 24.0937 5.438C23.0995 6.31999 23.0062 7.84988 23.8826 8.85054C24.7589 9.84852 26.2767 9.94508 27.2704 9.06309C27.6928 8.68872 28.1323 8.33592 28.5889 8.00469C29.6673 7.22627 29.9117 5.71365 29.1388 4.63096C28.3654 3.5483 26.8625 3.30177 25.7868 4.08018L25.7864 4.07969Z"
										fill="#E2E8F0"
									/>
								</Icon>
								<Text
									color="gray.500"
									fontWeight={700}
									fontSize="xl"
								>
									Upload a Resume
								</Text>
								<Text fontWeight={500} color="gray.500">
									Drag & drop or click to upload
								</Text>
							</Flex>
						</FormLabel>
						<Text color="red.500" fontWeight="bold">
							{pdfError}
						</Text>
					</FormControl>
					<Flex direction="column" gap={10}>
						<Box width={"full"} textAlign="left">
							<Text fontWeight={500} fontSize="xl">
								Select options
							</Text>
						</Box>

						<Flex direction="column" gap={4}>
							<Box width={"full"} textAlign="left">
								<Text fontWeight={500}>Tone</Text>
							</Box>
							<HStack {...group}>
								{options?.map((v) => {
									const radio = getRadioProps({
										value: v.name,
									});
									return (
										<RadioCard key={v.id} {...radio}>
											{v.name}
										</RadioCard>
									);
								})}
							</HStack>
						</Flex>
						<Flex direction="column" gap={4} mt={6}>
							<Text fontWeight={500}>Experimental *</Text>
							<Flex gap={2}>
								<Checkbox id="witty" {...register("witty")} />
								<label htmlFor="witty">
									Include a witty joke at the end of your
									letter 😂
								</label>
							</Flex>
						</Flex>
					</Flex>
					<Center mt={4}>
						<Button type="submit" size="lg" colorScheme={"blue"}>
							Generate Cover Letter
						</Button>
					</Center>
				</Flex>
			</form>
		</Card>
	);
};

export default Form;
