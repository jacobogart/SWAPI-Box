import React, { Component } from "react";
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import PeopleContainer from '../PeopleContainer/PeopleContainer';
// import './Main.scss';

class Main extends Component {
  constructor() {
    super()
    this.state = {
      showButtons: true,
      showCards: false,
      category: null
    }
  }

  toggleView = (event) => {
    let {showButtons, showCards} = this.state;
    if (!event || showCards) {
      this.setState({
        showButtons: !showButtons,
        showCards: !showCards
      });
    }
    
  }

  selectCategory = (event) => {
    this.toggleView();
    const category = event.target.innerHTML;
    this.setState({ category })
  }

  setContainer = () => {
    switch (this.state.category) {
      case "people":
        return <PeopleContainer />;
      // case "planet":
      //   return <PlanetContainer />;
      // case "vehicle":
      //   return <VehicleContainer />;
      default:
        return <h2>Error Loading Data</h2>

    }
  }

  render() {
    let {showButtons, showCards} = this.state;
    let buttonContainer = (
      <ButtonContainer 
        selectCategory={this.selectCategory}
      />
    );
    let cardContainer = this.setContainer();
    

    return (
      <main className="Main">
        <img 
          src="http://i67.tinypic.com/2vmvyw2.png" 
          alt="SWAPI-Box Logo"
          className="logo"
          onClick={(event) => this.toggleView(event)}
          role="button"
        />
        {showButtons && buttonContainer}
        {showCards && cardContainer}
      </main>
    );
  }
}

export default Main;