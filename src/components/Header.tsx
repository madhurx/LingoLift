import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<AppBar position="static">
				<Container maxWidth={"xl"}>
					<Toolbar>
						<Typography
							variant="h5"
							mr={"auto"}
							textTransform={"uppercase"}>
							LingoLift
						</Typography>
						<Link to={"/"} className="mx-2 text-white no-underline">
							Home
						</Link>
						<Link
							to={"/login"}
							className="mx-2 text-white no-underline">
							Login
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default Header;
