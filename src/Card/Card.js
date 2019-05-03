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
    console.log(dataKeys);
    return dataKeys.map(key => {
      return (
        <li key={uuidv4()}>
          <i className="fab fa-galactic-republic" />
          {key}: {data[key]}
        </li>
      );
    })
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