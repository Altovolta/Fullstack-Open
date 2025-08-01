

const Weather = ({city, weather}) => {

    const iconSrc = `https://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`
    return (
        <>
        <h2>Weather in {city}</h2>
        <p>
            Temperature: {weather.temp} | Feels like: {weather.feelsLike}
        </p>
        <p>
            Humidity: {weather.humidity}%
        </p>
        <img src={iconSrc} /> 
        <p>
            Wind: {weather.wind} m/s
        </p>
        </>
    )
    
    

    
}


export default Weather