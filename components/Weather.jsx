import {FaMapMarkerAlt, FaSearch} from "react-icons/fa"
import HourlyForecast from "../components/HourlyForecast"
import axios from "axios"
import { useState } from "react"

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null)
    const [city,setCity] = useState("")
    const [error, setError] = useState("")

    const api_key = "d5cf88947936435180c150142242209"
    const api_url = "http://api.weatherapi.com/v1/forecast.json"

    const fetchData =  async (query) => {
        try{
            const response = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=1`)
            setWeatherData(response.data)
            console.log(response)
            setError("")
        }catch(err){
            setError("There was an error or city not found")
            setWeatherData(null)
        }
    }

    const getCurrentLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                const {latitude,longitude}= position.coords
                const query = `${latitude},${longitude}`
                fetchData(query)
            },(error)=>{
                setError(error.message)
            })
        }else{
            setError("geolocation is not supported by this browser!")
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            fetchData(city)
        }
    }

    return (

        <>
        <div className='bg-green-100 min-h-screen flex items-center justify-center flex-col'>
            <h1 className="text-green-800 font-bold text-3xl font-arial">Weather App</h1>
        {/* card container */}
        <div className='bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm'> 
            <div className='flex'>
                {/* inputfield search btn */}
                <div className="flex border rounded items-center px-2 py-2 w-full cursor-pointer">
                    <FaSearch className="h-5 w-5"/>
                    <input
                    type="text"
                    placeholder='Enter City Name'
                    value={city}
                    autoCorrect="off"
                    onChange={(e) => setCity(e.target.value)}
                    onKeyUp={handleKeyPress}
                    className='pl-2 border-none focus:outline-none w-full'
                    />
                </div>

                {/* curent location btn */}
                <button 
                onClick={getCurrentLocation}
                className="px-4 p-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600 cursor-pointer">
                    <FaMapMarkerAlt className="w-5 h-5"/>
                </button>
            </div>

            {/* display error msg */}
                    <div>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    </div>

            {/* Weather data display */}
            {weatherData && (
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">{weatherData.location.name}</h2>
                     {/* Weather-icon */}
                    <img 
                    src={weatherData.current.condition.icon}
                    className="mx-auto h-40"/>
                    <p className="text-lg font-semibold">{weatherData.current.temp_c}°C</p>
                    <p className="text-sm capitalize font-semibold">{weatherData.current.condition.text}</p>
                    {/* Hourly forcast */}
                    <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour}/>
                </div>
            )}
        </div>
    </div>
        </>
    )
}

export default Weather