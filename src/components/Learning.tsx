import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
	clearState,
	getWordsFail,
	getWordsRequest,
	getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
	const params = useSearchParams()[0].get("language") as LangType;
	const [count, setCount] = useState<number>(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, words } = useSelector(
		(state: { root: StateType }) => state.root,
	);

	const nextHandler = (): void => {
		setCount((prev) => prev + 1);
	};

	useEffect(() => {
		dispatch(getWordsRequest());
		translateWords(params || "hi")
			.then((arr) => {
				dispatch(getWordsSuccess(arr));
			})
			.catch((err) => {
				dispatch(getWordsFail(err));
			});
		if (error) {
			alert(error);
			dispatch(clearState());
		}
	}, []);

	if (loading) return <Loader />;

	return (
		<Container maxWidth={"md"} className="px-4 py-2">
			<Button
				onClick={
					count === 0
						? () => navigate("/")
						: () => setCount((prev) => prev - 1)
				}>
				<ArrowBackIcon />
			</Button>
			<Typography m={"2rem 0"} className="px-10">
				Learning Made Easy
			</Typography>

			<Stack direction={"row"} spacing={"2rem"} className="px-10">
				<Typography variant={"h4"}>
					{count + 1}. {words[count]?.word}
				</Typography>
				<Typography variant={"h4"} color={"grey"}>
					{words[count]?.meaning}
				</Typography>
				<Button className="rounded-3xl">
					<VolumeUpIcon />
				</Button>
			</Stack>
			<div className="px-10 my-5">
				<Button
					variant="contained"
					fullWidth
					onClick={
						count === words.length - 1
							? () => navigate("/quiz")
							: nextHandler
					}>
					{count === words.length - 1 ? "Test" : "Next"}
				</Button>
			</div>
		</Container>
	);
};

export default Learning;
