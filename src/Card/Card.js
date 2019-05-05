import React, { Component } from "react";
const uuidv4 = require("uuid/v4");

class Card extends Component {
  constructor() {
    super()
    this.state = {
      favorited: false
    }
  }

  formatData = (data) => {
    let dataKeys = Object.keys(data)
      .filter(key => key !== 'key' && key !== 'name');
    return dataKeys.map(key => {
      if (key === 'residents'){
        return (
          <li key={uuidv4()}>
            <i className="fab fa-galactic-republic" />
            Residents:
            <ul>{this.formatResidents(data[key])}</ul>
          </li>
        );
      } else if (key === 'vehicleClass'){
        return (
          <li key={uuidv4()}>
            <i className="fab fa-galactic-republic" />
            Class:
            <ul>{data[key]}</ul>
          </li>
        );
      } else {
        return (
          <li key={uuidv4()}>
            <i className="fab fa-galactic-republic" />
            {this.formatKey(key)}: {data[key]}
          </li>
        );
      }
    });
  }

  formatKey = key => {
    let keyLetters = key.split('');
    keyLetters.splice(0, 1, keyLetters[0].toUpperCase());
    return keyLetters;
  }

  formatResidents = data => {
    return data 
      ? data.map(resident => {
        return (
          <li key={uuidv4()}>
            <i className="fab fa-galactic-republic" />
            {resident}
          </li>
        );
      })
      : (<li key={uuidv4()}>
            <i className="fab fa-galactic-republic" />
            none of importance
          </li>)
  }

  render() {
    let { data } = this.props;
    return (
      <article className="Card">
        <h3>{data.name}</h3>
        <ul>
          {this.formatData(data)}
        </ul>
      </article>
    );
  }
}

export default Card;