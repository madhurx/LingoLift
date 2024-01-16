import {
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveResult } from "../redux/slices";

const Quiz = () => {
	const [result, setResult] = useState<string[]>([]);
	const [count, setCount] = useState<number>(0);
	const [answer, setAnswer] = useState<string>("");

	const navigate = useNavigate();
	const { words } = useSelector((state: { root: StateType }) => state.root);
	const dispatch = useDispatch();

	const nextHandler = (): void => {
		setResult((prev) => [...prev, answer]);
		setCount((prev) => prev + 1);
		setAnswer("");
	};

	useEffect(() => {
        if(count+1 > words.length){
            navigate("/result")
        }
		dispatch(saveResult(result));
	}, [result]);

	return (
		<Container maxWidth={"sm"} className="px-4 py-2">
			<Typography m={"2rem 0"} className="px-10">
				Quiz
			</Typography>
			<Typography variant={"h3"} className="px-10">
				{count + 1} - {words[count]?.word}
			</Typography>
			<div className="px-10">
				<FormControl>
					<FormLabel className="mt-2 mb-1">Meaning</FormLabel>
					<RadioGroup
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}>
						{words[count]?.options.map((i, idx) => (
							<FormControlLabel
								value={i}
								control={<Radio />}
								label={i}
								key={idx}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</div>
			<div className="px-10 my-8">
				<Button
					variant={"contained"}
					fullWidth
					onClick={nextHandler}
					disabled={answer === ""}>
					{count === words.length - 1 ? "Submit" : "Next"}
				</Button>
			</div>
		</Container>
	);
};

export default Quiz;
