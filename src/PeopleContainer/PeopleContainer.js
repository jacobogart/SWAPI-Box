import React, { Component } from 'react';
import Card from '../Card/Card';
import {
  fetchMaster,
  fetchHomeworld,
  fetchSpecies
} from "../apiCalls/apiCalls.js";
const uuidv4 = require("uuid/v4");

class PeopleContainer extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      error: '',
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.setPeople();
  }

  setPeople = () => {
    fetchMaster('people')
      .then(data => fetchHomeworld(data.results))
      .then(people => fetchSpecies(people))
      .then(people => this.formatPerson(people))
      .catch(error => this.setState({ error }));
  };

  formatPerson = people => {
    let formattedPeople = people.map(person => {
      let { name, homeworld, population, species } = person;
      return { name, homeworld, population, species, key: uuidv4() };
    });
    this.setState({ people: formattedPeople, isLoading: false });
  }; 

  render() {
    const peopleCards = this.state.people.map(person => (
      <Card
        key={person.key}
        data={person}
        category="person"
        addToFavorites={this.props.addToFavorites}
      />
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
      <section className="cardContainer peopleContainer">
        {this.state.isLoading 
          ? loadingMessage
          : peopleCards}
      </section>
    );
  }
}

export default PeopleContainer;

