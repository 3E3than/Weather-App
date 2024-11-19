import React from 'react'
import Weather from './components/Weather'
import { WeatherProvider } from './WeatherContext'

const App = () => {
  return (
    <WeatherProvider>
      <div className = "app">
        <Weather/>
      </div>
    </WeatherProvider>
  )
}

export default App