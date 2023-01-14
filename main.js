//console.log("hola emma");
// Elementos del DOM
let translateFrom = document.querySelector("#translateFrom");
let translateTo = document.querySelector("#translateTo");
let translate = document.querySelector("#translate");
let source_language = "es";
let target_language;

// Conseguir la lista de lenguajes desde el servidor //
const GET_URL = "https://text-translator2.p.rapidapi.com/getLanguages";

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c4783e8f3cmsh8f0d9e7a2790333p10e64cjsn6401d74ae3ad",
		"X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
	},
};

fetch(GET_URL, options)
	.then((res) => res.json())
	.then((objeto) => {
		//console.log(objeto.data.languages);
		let lenguages = objeto.data.languages;
		// Codigo para los Select
		lenguages.forEach((element) => {
			translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`;
			translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`;
		});
		translateFrom.addEventListener("click", () => {
			source_language = translateFrom.value;
		});
		translateTo.addEventListener("click", () => {
			target_language = translateTo.value;
		});
	})
	.catch((error) => console.log(error));
// Recoger los datos del input para enviarlos al servidor
translate.addEventListener("click", () => {
	let inputTranslate = document.querySelector("#inputTranslate");
	let textToTranslate = inputTranslate.value;

	const encodedParams = new URLSearchParams();
	encodedParams.append("source_language", source_language);
	encodedParams.append("target_language", target_language);
	encodedParams.append("text", textToTranslate);

	const options = {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Key": "c4783e8f3cmsh8f0d9e7a2790333p10e64cjsn6401d74ae3ad",
			"X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
		},
		body: encodedParams,
	};

	fetch("https://text-translator2.p.rapidapi.com/translate", options)
		.then((response) => response.json())
		.then((response) => (outputTranslate.value = response.data.translatedText))
		.catch((err) => console.error(err));
});
