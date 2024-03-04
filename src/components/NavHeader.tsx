import Navbar from "react-bootstrap/Navbar";
import { NumberInput } from "./NumberInput";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Github } from "react-bootstrap-icons";

interface NavHeaderProps {
	terminationProbability: number;
	setTerminationProbability: (p: number) => void;
	stableProbability: number;
	setStableProbability: (p: number) => void;
	gridSize: number;
	setGridSize: (n: number) => void;
	generate: () => void;
	generationLimit: number;
	setGenerationLimit: (n: number) => void;
	haveBorders: boolean;
	setHaveBorders: () => void;
}

export const NavHeader = ({
	terminationProbability,
	setTerminationProbability,
	stableProbability,
	setStableProbability,
	gridSize,
	setGridSize,
	generationLimit,
	setGenerationLimit,
	haveBorders,
	setHaveBorders,
	generate,
}: NavHeaderProps) => {
	const growthPrbability = 1 - terminationProbability - stableProbability;

	return (
		<Navbar
			bg="dark"
			data-bs-theme="dark"
		>
			<Navbar.Brand>Probabilities:</Navbar.Brand>
			<InputGroup>
				<NumberInput
					label={"Termination"}
					inputStep={0.01}
					inputMin={0.01}
					inputMax={0.5}
					value={terminationProbability}
					setValue={setTerminationProbability}
					tooltip="Probability the cell will terminate its path."
				/>
				<NumberInput
					label={"Stable"}
					inputStep={0.01}
					inputMin={0.01}
					inputMax={0.5}
					value={stableProbability}
					setValue={setStableProbability}
					tooltip="Probability the cell will propagate the path."
				/>
				<NumberInput
					label={"Growth"}
					inputStep={0.01}
					inputMin={0.01}
					inputMax={0.5}
					value={growthPrbability}
					setValue={() => {}}
					disabled={true}
					tooltip="Probability the cell will grow in paths."
				/>
			</InputGroup>
			<Navbar.Brand>Others:</Navbar.Brand>
			<InputGroup>
				<NumberInput
					label={"Grid Size"}
					inputStep={5}
					inputMin={20}
					inputMax={100}
					value={gridSize}
					setValue={setGridSize}
					tooltip="The size of the grid."
				/>
				<NumberInput
					label={"Generation Limit"}
					inputStep={1}
					inputMin={1}
					inputMax={1000}
					value={generationLimit}
					setValue={setGenerationLimit}
					tooltip="The maximum number of iterations."
				/>
				<InputGroup.Text>{"Borders"}</InputGroup.Text>
				<Form.Check
					type="switch"
					checked={haveBorders}
					onChange={setHaveBorders}
				/>

				<Button onClick={generate}>Generate</Button>
			</InputGroup>

			<Button
				target="_blank"
				href={"https://github.com/lazukr/procedural-map-test"}
			>
				<Github />
			</Button>
		</Navbar>
	);
};
