import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { lime, purple } from "@mui/material/colors";
import "./main.css";

const theme = createTheme({
	palette: {
		primary: { main: "rgb(13, 97, 4)" },
		secondary: purple,
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<App />
			</CssBaseline>
		</ThemeProvider>
	</React.StrictMode>,
);
