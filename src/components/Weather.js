import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <>
        <h2>Daily Weather</h2>

        {this.props.weatherData.map((day, idx) => {
          return (
            <>
              <div key={idx}>
                <p>{day.date}</p>
                <p>{day.description}</p>
              </div>
            </>
          );
        })}
      </>
    );
  }
}
export default Weather;