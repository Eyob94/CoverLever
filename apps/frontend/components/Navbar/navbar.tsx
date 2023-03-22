"use client";

import {
	Badge,
	Button,
	ButtonGroup,
	Flex,
	HStack,
	Highlight,
	Spacer,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";

export const NavBar = () => {
	return (
		<Flex mb={28}>
			<VStack alignItems="start" justify="center" spacing={0}>
				<Text fontSize="3xl">
					<Highlight
						query="Cover"
						styles={{ fontWeight: "bold", color: "white" }}
					>
						CoverLever ⚡️
					</Highlight>
				</Text>
				<HStack fontSize="sm" spacing={4} h={4}>
					<Text>The instant a.i. cover letter generator</Text>
					<Tag variant="solid" colorScheme="pink" fontSize="xs">
						100% free
					</Tag>
				</HStack>
			</VStack>
			<Spacer />
			<ButtonGroup spacing={10} mt={2}>
				<Button
					variant="ghost"
					_hover={{ bg: "rgba(255,255,255,0.2)" }}
					_active={{ bg: "rgba(255,255,255,.1)" }}
					colorScheme="pink"
					color="white"
					size="lg"
				>
					Login
				</Button>
				<Button variant={"solid"} colorScheme="pink" size="lg">
					Get Started
				</Button>
			</ButtonGroup>
		</Flex>
	);
};
