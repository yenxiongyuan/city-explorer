import React from "react";

class Movies extends React.Component {
  render() {
    console.log(this.props)
    return (
      <>
        <h2>Movies</h2>

        {/* {this.props.moviesData.map((movie, idx) => {
          return ( */}
        <>
          
            <p>{this.props.moviesData.movie}</p>
            <p>{this.props.moviesData.description}</p>
          
        </>
        {/* );
        })} */}
      </>
    );
  }
}
export default Movies;
