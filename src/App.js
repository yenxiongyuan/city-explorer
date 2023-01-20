import React from 'react';
import './App.css';
import axios from 'axios';
import Weather from "./components/Weather";
import Movies from './components/Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: [],
      error: false,
      errorMessage: "",
      weatherData: [],
      moviesData: [],
      movieError: false,
      movieErrorMessage: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_GPS_API_KEY}&q=${this.state.city}&format=json&limit=2`;

      console.log(url);

      let cityDataFromAxios = await axios.get(url);
      console.log(cityDataFromAxios.data);

       let lat = cityDataFromAxios.data[0].lat;
       let lon = cityDataFromAxios.data[0].lon;

       this.handleGetWeather(lat, lon);
       this.handleGetMovies();

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  handleGetWeather = async (lat, lon) => {
    try {
      // TODO: build URL
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.city}`;

      // TODO: Use axios to hit my server
      let weatherDataFromAxios = await axios.get(url);

      console.log("WEATHER: ", weatherDataFromAxios.data);
      // TODO: Save that weather data to state
      this.setState({
        weatherData: weatherDataFromAxios.data,
      });
    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message,
      });
    }
  };

  handleGetMovies = async () => {

    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`
      console.log(url);
      let movieFromAxios = await axios.get(url);
      console.log(movieFromAxios);
      this.setState({
        moviesData: movieFromAxios.data,
        movieError: false,
        movieErrorMessage: '',
      })
    } catch (error) {
      this.setState({
        movieError: true,
        movieErrorMessage: error.message
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.getCityData}>
          <label htmlFor="">
            {" "}
            Pick a City!
            <input type="text" onInput={this.handleInput} />
            <button type="submit">Explore</button>
          </label>
        </form>
        <p>{this.state.cityData.display_name}</p>
        <p>{this.state.cityData.lat}</p>
        <p>{this.state.cityData.lon}</p>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_GPS_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`}
          alt="map"
        />
        <Weather weatherData={this.state.weatherData} />
        {this.state.moviesData.map(movie => <Movies moviesData={movie} />)}
      </>
    );
  }
}  

export default App;
