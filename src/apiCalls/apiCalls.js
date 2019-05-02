export const fetchMovie = (num) => {
  return fetch(`https://swapi.co/api/films/${num}`)
    .then(response => {
    if (!response.ok) {
      throw Error("Error loading film text");
    } else {
      return response.json()
    }
  });
};

export const fetchPeople = () => {
  return fetch(`https://swapi.co/api/people/`)
  .then(response => {
    if (!response.ok) {
      throw Error("Error loading people");
    } else {
      return response.json();
    }
  });
}

export const fetchHomeworld = (people) => {
  const homeworldPromises = people.map(person => {
    return fetch(person.homeworld)
      .then(response => response.json())
      .then(homeworld => Object.assign(person, {homeworld: homeworld.name, population: homeworld.population}))
  })
  return Promise.all(homeworldPromises)
}

export const fetchSpecies = (people) => {
  const speciesPromises = people.map(person => {
    return fetch(person.species[0])
      .then(response => response.json())
      .then(species => Object.assign(person, { species: species.name }));
  })
  return Promise.all(speciesPromises);
}

