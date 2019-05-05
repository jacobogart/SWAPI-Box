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

export const fetchMaster = (category) => {
  return fetch(`https://swapi.co/api/${category}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error loading ${category}`);
      } else {
        return response.json();
      }
  });
}

export const fetchHomeworld = (people) => {
  const homeworldPromises = people.map(person => {
    return fetch(person.homeworld)
      .then(response => {
        if (!response.ok) {
          throw Error("Error loading homeworld");
        } else {
          return response.json();
        }
      })
      .then(homeworld =>
        Object.assign(person, {
          homeworld: homeworld.name,
          population: homeworld.population
        })
      );
  })
  return Promise.all(homeworldPromises)
}

export const fetchSpecies = (people) => {
  const speciesPromises = people.map(person => {
    return fetch(person.species[0])
      .then(response => {
        if (!response.ok) {
          throw Error("Error loading species");
        } else {
          return response.json();
        }
      })
      .then(species => Object.assign(person, { species: species.name }));
  });
  return Promise.all(speciesPromises);
}

export const fetchResidents = (planets) => {
  const allResidentsPromises = planets.map(planet => {
    if (planet.residents.length) {
      let residentNames = [];
      let residentPromise = planet.residents.map(resident => {
        return fetch(resident)
          .then(response => response.json())
          .then(result => {
            residentNames.push(result.name)
            return Object.assign(planet, { residentNames })
          });
      });
      return Promise.all(residentPromise);
    } else {
      return planet;
    }
  });
  return Promise.all(allResidentsPromises)
};
