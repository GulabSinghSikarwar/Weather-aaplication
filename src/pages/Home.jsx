import React, { useState } from "react";
import {
	Forecast,
	Inputs,
	SunriseAndSunset,
	TemperatureAndDetails,
} from "../components";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../components/Api";
import { Navbar } from "../components";

const Home = () => {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [showInCel, setShowInCel] = useState(true);

	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(" ");

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({ city: searchData.label, ...weatherResponse });
				setForecast({ city: searchData.label, ...forecastResponse });
			})
			.catch((err) => console.log(err));
	};

	console.log(currentWeather);
	console.log(forecast);
	const toggleCells = (changeTemp) => {
		if (!showInCel && changeTemp) {
			// if temp is fahrenheit then only convert Cel
			currentWeather.main.temp = fahrenheitToCelsius(currentWeather.main.temp)
			setShowInCel(changeTemp);
		}
		else if (showInCel && !changeTemp) {
			currentWeather.main.temp = celsiusToFahrenheit(currentWeather.main.temp)
			setShowInCel(changeTemp);
		}
	};
	const fahrenheitToCelsius = (fahrenheit) => {
		const celsius = (fahrenheit - 32) * 5 / 9;
		const ferhntoC = Math.round(celsius);
		return ferhntoC;
	};

	const celsiusToFahrenheit = (celsius) => {
		const fahrenheit = (celsius * 9 / 5) + 32;
		const celToF = Math.round(fahrenheit);
		return celToF;
	};


	return (
		<div>
			<Navbar toggleToCel={toggleCells} />
			<div className='bg-[#000a18] text-blue-100 py-40 px-24  max-[734px]:px-0 justify-center flex '>
				<div className=' flex-col  flex  max-w-[2300px]'>
					<div className='bg-gradient-to-b from-[#a239e8]  to-[#3a10f3] max-[934px]:h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full'>
						<Inputs onSearchChange={handleOnSearchChange} />

						{currentWeather && <TemperatureAndDetails data={currentWeather} />}
					</div>
					<div className='second_box w-full bg-gradient-to-b from-[#baeeff]  to-[#e0ecff] '>
						{currentWeather && forecast && <SunriseAndSunset data={currentWeather} />}
					</div>
					{forecast && currentWeather && <Forecast title='Daily' data={forecast} showInCel={showInCel} fahrenheitToCelsius={fahrenheitToCelsius} celsiusToFahrenheit={celsiusToFahrenheit} />}
				</div>
			</div>
		</div>
	);
};

export default Home;
