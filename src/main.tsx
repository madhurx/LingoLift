import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { lime, purple } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: lime,
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
