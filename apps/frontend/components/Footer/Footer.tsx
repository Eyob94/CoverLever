import { Center, Highlight, Text } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Center>
			<Text>
				<Highlight
					query={["Terms of Use", "Privacy Policy"]}
					styles={{
						textDecor: "underline",
						textUnderlineOffset: "4px",
						color: "#F9AEFF",
					}}
				>
					2023 CoverLever a Splitts company | Terms of Use Privacy
					Policy
				</Highlight>
			</Text>
		</Center>
	);
};

export default Footer;
