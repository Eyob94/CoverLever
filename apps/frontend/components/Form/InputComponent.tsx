import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";

interface errorObject {
	name: string;
	message: string;
}

interface InputComponentProps {
	label: string;
	errors?: any;
	type: string;
	required: boolean;
	register?: any;
	name: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
	label,
	errors,
	type,
	required = false,
	register,
	name,
}) => {
	return (
		<FormControl isRequired={required} isInvalid={!!errors?.[name]}>
			<FormLabel fontWeight={500} py={3}>
				{label}
			</FormLabel>
			<Input
				bg="white"
				type={type}
				{...register(name, {
					required,
				})}
			/>
			{errors?.[name] && (
				<FormErrorMessage>{errors?.[name]}</FormErrorMessage>
			)}
		</FormControl>
	);
};

export default InputComponent;
