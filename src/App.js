import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: [],
      error: false,
      errorMessage: "",
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
      console.log(cityDataFromAxios.data)
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

  render() {
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
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_GPS_API_KEY}&center={this.state.cityData.lat},{this.state.cityData.lon}&zoom=10`} alt="map"/>
      </>
    );
  }
}  

export default App;
