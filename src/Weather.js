import React, { useState } from "react";

import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [message, setMessage] = useState("");

  function showData(response) {
    setLoaded(true);
    setMessage({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios.get(url).then(showData);
  }

  function searchCity(event) {
    setCity(event.target.value);
  }

  let weatherForm = (
    <form className="App" onSubmit={handleSubmit}>
      <h1>Weather App</h1>
      <input type="search" onChange={searchCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {weatherForm}
        <ul>
          <li>Temperature: {Math.round(message.temperature)}</li>
          <li>Description: {message.description}</li>
          <li>Humidity: {Math.round(message.humidity)}</li>
          <li>Wind: {Math.round(message.wind)}</li>
          <li>
            <img src={message.icon} alt={message.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return weatherForm;
  }
}
