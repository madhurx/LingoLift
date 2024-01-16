import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

const generateOptions = (
	meaning: { Text: string }[],
	idx: number,
): string[] => {
	const correctAns: string = meaning[idx].Text;
	const allMeaningExceptCorrect = meaning.filter(
		(i) => i.Text !== correctAns,
	);
	const incorrectAns: string[] = _.sampleSize(allMeaningExceptCorrect, 3).map(
		(i) => i.Text,
	);
	const optionsMCQ = _.shuffle([...incorrectAns, correctAns]);
	return optionsMCQ;
};

export const translateWords = async (lang: LangType): Promise<WordType[]> => {
	try {
		const words = generate(8).map((i) => ({
			Text: i,
		}));
		const rapidApiKey = import.meta.env.VITE_RapidAPI_KEY;

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
				"X-RapidAPI-Key": rapidApiKey,
				"X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
			},
		};
		const response = await axios.post(url, words, options);
		const received: FetchedDataType[] = response.data;
		const arr: WordType[] = received.map((i, idx) => {
			const options: string[] = generateOptions(words, idx);

			return {
				word: i.translations[0].text,
				meaning: words[idx].Text,
				options,
			};
		});
		return arr;
	} catch (error) {
		console.log(error);
		throw new Error("Some Error Occurred");
	}
};

export const countMatchingElements = (
	arr1: string[],
	arr2: string[],
): number => {
	if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");

	let matchedCount = 0;

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] === arr2[i]) matchedCount++;
	}

	return matchedCount;
};

export const fetchAudio = async (
	text: string,
	language: LangType,
): Promise<string> => {
	const encodedParams = new URLSearchParams({
		src: text,
		hl: language,
		r: "0",
		c: "mp3",
		f: "8khz_8bit_mono",
		b64: "true",
	});
	if (language === "ja") encodedParams.set("hl", "ja-jp");
	else if (language === "es") encodedParams.set("hl", "es-es");
	else if (language === "fr") encodedParams.set("hl", "fr-fr");
	else encodedParams.set("hl", "hi-in");

	const textToSpeechKey = import.meta.env.VITE_TEXT_TO_SPEECH;
	const rapidApiKey = import.meta.env.VITE_RapidAPI_KEY;
	const options = {
		params: {
			key: textToSpeechKey,
		},
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Key": rapidApiKey,
			"X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
		},
		data: encodedParams,
	};

	const { data }: { data: string } = await axios.post(
		"https://voicerss-text-to-speech.p.rapidapi.com/",
		encodedParams,
		options,
	);

	return data;
};
