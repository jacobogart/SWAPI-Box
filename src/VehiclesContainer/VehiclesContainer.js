import React, { Component } from "react";
import Card from "../Card/Card";
import { fetchMaster } from "../apiCalls/apiCalls.js";
const uuidv4 = require("uuid/v4");

class VehiclesContainer extends Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
      error: "",
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setVehicles();
  }

  setVehicles = () => {
    fetchMaster("vehicles")
      .then(data => this.formatVehicle(data.results))
      .catch(error => this.setState({ error }));
  };

  formatVehicle = vehicles => {
    let formattedVehicles = vehicles.map(vehicle => {
      let { name, model, passengers } = vehicle;
      let vehicleClass = vehicle.class;
      return { name, model, vehicleClass, passengers, key: uuidv4() };
    });
    console.log(formattedVehicles)
    this.setState({ vehicles: formattedVehicles, isLoading: false });
  };

  render() {
    const vehiclesCards = this.state.vehicles.map(vehicle => (
      <Card key={vehicle.key} data={vehicle} category="vehicle" />
    ));

    const loadingMessage = (
      <div className="loadingMessage">
        <img
          src="https://ui-ex.com/images/transparent-gifs-star-wars.gif"
          alt="BB8 Animation"
        />
        <p>Loading...</p>
      </div>
    );
    return (
      <section className="cardContainer vehiclesContainer">
        {this.state.isLoading ? loadingMessage : vehiclesCards}
      </section>
    );
  }
}

export default VehiclesContainer;
