import React, { Component } from 'react';
import { fetchMovie, fetchPeople, fetchHomeworld, fetchSpecies } from '../apiCalls/apiCalls.js';
import Crawl from 'react-star-wars-crawl';
import "react-star-wars-crawl/lib/index.css";
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movie: {},
      people: [],
      error: ''
    }
  }

  componentDidMount() {
    this.setMovie();
    this.setPeople();
  }

  setMovie = () => {
    let num = Math.floor(Math.random() * (6)) + 1;
    fetchMovie(num)
      .then(data => {
        let { title, episode_id, opening_crawl } = data;
        let numeral = this.convertEpisodeId(episode_id);
        this.setState({
          title: `Episode ${numeral}`,
          subTitle: title,
          text: opening_crawl
        });
      });
  }

  setPeople = () => {
    fetchPeople()
      .then(data => fetchHomeworld(data.results))
      .then(people => fetchSpecies(people))
      .then(people => this.formatPerson(people))
      .catch(error => this.setState({ error }))
  }

  formatPerson = (people) => {
    let formattedPeople = people.map(person => {
      let { name, homeworld, population, species } = person;
      return { name, homeworld, population, species }
    });
    this.setState({ people: formattedPeople });
  }

  convertEpisodeId = (id) => {
    switch (id) {
      case 1:
        return 'I'
      case 2:
        return 'II'
      case 3:
        return 'III'
      case 4:
        return 'IV'
      case 5:
        return 'V'
      case 6:
        return 'VI'
      case 7:
        return 'VII'
      case 8:
        return 'VIII'
      default:
        console.log('Unexpected Episode ID');
    }
  }

  render() {
    let { title, subTitle, text } = this.state;
    return (
      <Crawl
        title={title}
        subTitle={subTitle}
        text={text}
      />
    );
  }
}

export default App;
