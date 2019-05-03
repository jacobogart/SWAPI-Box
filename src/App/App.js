import React, { Component } from 'react';
import { fetchMovie } from '../apiCalls/apiCalls.js';
import Crawl from 'react-star-wars-crawl';
import Main from '../Main/Main.js';
import "react-star-wars-crawl/lib/index.css";
// import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movie: {},
      error: ''
    }
  }

  componentDidMount() {
    this.setMovie();
  }

  setMovie = () => {
    let num = Math.floor(Math.random() * (6)) + 1;
    fetchMovie(num)
      .then(data => {
        let { title, episode_id, opening_crawl } = data;
        let numeral = this.convertEpisodeId(episode_id);
        this.setState({
          movie: {
            title: `Episode ${numeral}`,
            subTitle: title,
            text: opening_crawl
          }
        });
      });
  }

  convertEpisodeId = (id) => {
    const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
    return numerals[id - 1]
  }

  render() {
    let { title, subTitle, text } = this.state.movie;

    return (
      <div className="App" >
        <Crawl
        title={title}
        subTitle={subTitle}
        text={text}
        />
        <Main />
      </div>
      
    );
  }
}

export default App;
