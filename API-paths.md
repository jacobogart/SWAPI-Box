BASE URL (https://swapi.co/api/)

(https://swapi.co/api/people/)
People (data.results) [save as 'people' in state, itterate as 'person']
  Name (this.props.person.name)
  Homeworld (this.props.person.homeworld) [fetch request, save as 'homeworld' in state]
    (this.state.homeworld.name)
  Species (this.props.person.species) [fetch request, save as 'species' in state]
    (this.state.species.name)
  Population of Homeworld (this.state.homeworld.population)

