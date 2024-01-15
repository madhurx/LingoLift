import { Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Learning = () => {
	const params = useSearchParams()[0].get("language") as LangType;
	const [count, setCount] = useState<number>(0);
	const navigate = useNavigate();

	const nextHandler = (): void => {
		setCount((prev) => prev + 1);
	};

	return (
		<Container maxWidth={"sm"} className="px-4 py-2">
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
					{count + 1}. {"Sample"}
				</Typography>
				<Typography variant={"h4"} color={"grey"}>
					{"Lol"}
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
						count === 7 ? () => navigate("/quiz") : nextHandler
					}>
					{count === 7 ? "Test" : "Next"}
				</Button>
			</div>
		</Container>
	);
};

export default Learning;
