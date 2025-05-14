
import "./HourlyForecast.css"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import { useRef } from "react"

const HourlyForecast = ({hourlyData}) => {

    const scrollRef = useRef(null) // refrence to the scrollbar container

    //scroll functions
    const scrollLeft = () => {
        scrollRef.current.scrollBy({left:-300 , behavior:"smooth"})
    }
    const scrollRight = () => {
        scrollRef.current.scrollBy({left:300 , behavior:"smooth"})
    }

    return (
    <div className=" relative mt-6">

        <div  
        ref={scrollRef} 
        className=" flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide" style={{scrollBehavior:"smooth"}}>
            {
                hourlyData.map((hour,index)=>(
                <div key={index} className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4">
                <p>{new Date(hour.time).getHours()}:00</p>
                <img
                src={hour.condition.icon} alt="Weather-icon"
                className="w-10 mx-auto"/>
                <p>{hour.temp_c}</p>
            </div>
                ))
            }
        </div>

        {/* scroll buttons */}
        <button  
        onClick={scrollLeft} 
        className="absolute left-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
            <FaChevronLeft className="w-4"/>
        </button> 

        <button 
        onClick={scrollRight} 
        className="absolute right-0 top-1/2 bg-green-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
            <FaChevronRight className="w-4"/>
        </button>

    </div>
    )
}

export default HourlyForecast