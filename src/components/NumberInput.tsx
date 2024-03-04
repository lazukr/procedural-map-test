import { useMemo } from "react";
import { InputGroup, OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";

interface NumberInputProps {
	label: string;
	inputStep: number;
	inputMin: number;
	inputMax: number;
	value: number;
	setValue: (n: number) => void;
	tooltip: string;
	disabled?: boolean;
}

export const NumberInput = ({
	label,
	inputStep,
	inputMin,
	inputMax,
	value,
	setValue,
	tooltip,
	disabled = false,
}: NumberInputProps) => {
	const renderTooltip = useMemo(
		() => <Tooltip id="button-tooltip">{tooltip}</Tooltip>,
		[tooltip]
	);

	return (
		<>
			<OverlayTrigger
				overlay={renderTooltip}
				placement="right"
				delay={{ show: 250, hide: 400 }}
			>
				<InputGroup.Text>{label}</InputGroup.Text>
			</OverlayTrigger>
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
