import axios from "axios";
import { generate } from "random-words";

export const translateWords = async (lang: LangType) => {
	try {
		const words = generate(8).map((i) => {
			Text: i;
		});
		const url =
			"https://microsoft-translator-text.p.rapidapi.com/translate";
		const options = {
			params: {
				"to[0]": lang,
				"api-version": "3.0",
				profanityAction: "NoAction",
				textType: "plain",
			},
			headers: {
				"content-type": "application/json",
				"X-RapidAPI-Key":
					"666b389ed5msh9b47b23bcefaa3dp1a8666jsn67f62f8bbf63",
				"X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
			},
		};
		const { data } = await axios.post(url, words, options);
		console.log(data);
	} catch (error) {
		console.log(error);
		throw new Error("Some Error Occurred");
	}
};
