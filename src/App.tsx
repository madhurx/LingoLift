import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import { Container } from "@mui/material";

const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./components/Login"));

function App() {
	return (
		<Router>
			<Header />
			<Container maxWidth={"xl"}>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/learning" element={<Learning />} />
						<Route path="/quiz" element={<Quiz />} />
						<Route path="/result" element={<Result />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</Suspense>
			</Container>
		</Router>
	);
}

export default App;
