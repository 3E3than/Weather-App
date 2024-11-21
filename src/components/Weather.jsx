import React, { useContext, useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import { WeatherContext } from '../WeatherContext'

const Weather = () => {

    const {weatherData, setWeatherData} = useContext(WeatherContext);
    const inputRef = useRef();
    const APP_ID = import.meta.env.VITE_APP_ID
    console.log(APP_ID)

    const search = async (city)=>{
        if (city == "") {
            alert("enter city name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` || clear_icon;
            setWeatherData({
                humidity: data.main.humidity, 
                windspeed: data.wind.speed, 
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                weatherdescription: data.weather[0]?.description
            })
        }
        catch(error) {
            setWeatherData(false);
            alert("incorrect city")
            console.error("error fetching data")
        }
    }

  return (
    <div className = 'weather'>
        <div className= 'searchbar'>
            <input ref = {inputRef} type = 'text' placeholder= 'search by city name' />
            <img src = {search_icon} alt='' onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src = {weatherData.icon} className = 'weathericon'/>
        <p className='temperature'>{weatherData.temperature} degrees C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weatherdata'>
            <div className='col'>
                <img src={wind_icon} alt=''/>
                <div>
                    <p>{weatherData.windspeed}</p>
                    <span>Wind Speed</span>
                </div>
            </div>
            <div className='col'>
                <img src={humidity_icon} alt=''/>
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather