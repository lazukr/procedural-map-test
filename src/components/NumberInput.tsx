import { InputGroup } from "react-bootstrap";

interface NumberInputProps {
	label: string;
	inputStep: number;
	inputMin: number;
	inputMax: number;
	value: number;
	setValue: (n: number) => void;
	disabled?: boolean;
}

export const NumberInput = ({
	label,
	inputStep,
	inputMin,
	inputMax,
	value,
	setValue,
	disabled = false,
}: NumberInputProps) => {
	return (
		<>
			<InputGroup.Text>{label}</InputGroup.Text>
			<input
				type="number"
				min={inputMin}
				max={inputMax}
				step={inputStep}
				value={value}
				onChange={(e) => setValue(e.target.valueAsNumber)}
				disabled={disabled}
			/>
		</>
	);
};
