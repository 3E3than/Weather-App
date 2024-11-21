import { HfInference } from "@huggingface/inference";
import { WeatherContext } from '../WeatherContext';
import React, { useContext, useEffect, useState } from 'react';
import { Typewriter } from "react-simple-typewriter";
import './Haiku.css'

export const Haiku = () => {
	const HF_ID = import.meta.env.VITE_HF_ID;
	console.log(HF_ID);
	const { weatherData } = useContext(WeatherContext);
	const [haiku, setHaiku] = useState("Search for a weather by city");
	console.log(weatherData);
	const getHaiku = async () =>{
		const client = new HfInference(HF_ID);
		let out = "";
		try {
			const stream = client.chatCompletionStream({
				model: "Qwen/Qwen2.5-Coder-32B-Instruct",
				messages: [
					{
						role: "user",
						content: `Write me a haiku about ${weatherData.weatherdescription}. Only give me the haiku`
					}
				],
				max_tokens: 500
			});
		
			for await (const chunk of stream) {
				if (chunk.choices && chunk.choices.length > 0) {
					const newContent = chunk.choices[0].delta.content;
					out += newContent;
				}  
			}
			setHaiku(out);
		} catch (error) {
			setHaiku(false);
            alert("no weather data yet");
		}
	}
	
	useEffect(() => {
		if (weatherData && weatherData.weatherdescription) {
			getHaiku();
		}
	  }, [weatherData.weatherdescription]);
	

	return (
		<div className="haiku">
            <h1>Haiku Generator</h1>
            <Typewriter key={haiku} words={[haiku]} loop={1} typeSpeed={50} />
        </div>
		
  	)
}