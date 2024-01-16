import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
import "./main.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

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
				<Provider store={store}>
					<App />
				</Provider>
			</CssBaseline>
		</ThemeProvider>
	</React.StrictMode>,
);
