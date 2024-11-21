import React from 'react'
import Weather from './components/Weather'
import { WeatherProvider } from './WeatherContext'
import { Haiku } from './components/Haiku'

const App = () => {
  return (
    <WeatherProvider>
      <div className = "app">
        <h1 className='appHeader'>Weather App</h1>
        <Weather/>
        <Haiku/>
      </div>
    </WeatherProvider>
  )
}

export default App