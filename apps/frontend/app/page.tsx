"use client";

import {
	Box,
	Card,
	Center,
	CircularProgress,
	CircularProgressLabel,
	Flex,
} from "@chakra-ui/react";
import Form from "../components/Form/Form";

import Title from "../components/Title/Title";

const HomePage = () => {
	return (
		<>
			<Box>
				<Title />
			</Box>
			<Center py={4}>
				<Card
					maxW="6xl"
					minW="6xl"
					py={4}
					px={3}
					bg="rgba(255,255,255,0.1)"
					variant="elevated"
					rounded="3xl"
				>
					<Form />
				</Card>
			</Center>
		</>
	);
};

export default HomePage;
