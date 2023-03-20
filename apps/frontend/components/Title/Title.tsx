"use client";

import { VStack, Text, Highlight } from "@chakra-ui/react";

const Title = () => {
	return (
		<>
			<VStack spacing={7} alignItems="center">
				<Text fontSize="4xl" fontWeight="600">
					Cover letters are boring & we think they're a waste of time
				</Text>
				<Text>
					<Highlight
						query={["CoverLever", "ChatGPT"]}
						styles={{ fontWeight: "bold", color: "white" }}
					>
						CoverLever is a free tool that utilizes the same
						technology behind ChatGPT to create the perfect cover
						letter
					</Highlight>
				</Text>
				<Text fontSize={"xl"}>
					Get started for free (no registration required) ⚡
				</Text>
			</VStack>
		</>
	);
};

export default Title;
