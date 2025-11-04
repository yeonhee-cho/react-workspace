const Weather = ({ city, temperature }) => {
    return (
        <>
            <div>
                <p>{city}의 날씨</p>
                <p>온도: {temperature}°C</p>
            </div>
        </>
    );
};

export default Weather;
