import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props: any) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box width="full" textAlign={"center"} as="label">
			<input {...input} />

			<Box
				bg="white"
				cursor={"pointer"}
				{...checkbox}
				borderWidth={1}
				rounded="xl"
				p={4}
				display="flex"
				justifyContent="center"
				width="full"
				height={24}
				alignItems="center"
				_checked={{
					borderWidth: "2px",
					borderColor: "purple.500",
					bg: "#F6F4FF",
				}}
				_hover={{
					bg: "#F6F4FF",
				}}
			>
				{props.children}
			</Box>
		</Box>
	);
};

export default RadioCard;
