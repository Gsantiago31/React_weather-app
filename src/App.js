// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

import'weather-icons/css/weather-icons.min.css';
import'bootstrap/dist/css/bootstrap.min.css';

// api call api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_key = "375360959d549f05e232371cf556ec57";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      city : undefined,
      country : undefined,
      icon : undefined,
      main : undefined,
      celsius : undefined,
      temp_max : undefined,
      temp_min : undefined,
      description: "",
      error: false
     }

    this.weatherIcon = {
      Thunderstorm : "wi-thunderstorm",
      Drizzle : "wi-sleet",
      Rain : "wi-storm-showers",
      Atmosphere : "wi-fog",
      clear : "wi-day-sunny",
      Clouds : "wi-day-fog"
    }
  }

  calCelcius(temp){
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  getWeather = async (e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.city.value;

    if(city && country){
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );
    
      const response = await api_call.json();

      console.log(response);

      this.setState({
      city: `${response.name}, ${response.sys.country}`,
      celsius: this.calCelcius(response.main.temp),
      temp_max: this.calCelcius(response.main.temp_max),
      temp_min: this.calCelcius(response.main.temp_min),
      description: response.weather[0].description,
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    }else{
      this.setState({error : true});
    }

  };

  render() { 
    return (
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weatherIcon={this.state.icon}
      />
    </div>
      );
  };
};
 
export default App;
