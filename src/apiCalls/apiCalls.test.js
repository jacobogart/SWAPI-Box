import {
  fetchMovie,
  fetchMaster,
  fetchHomeworld,
  fetchSpecies,
  fetchResidents
} from "./apiCalls.js";

describe('API Calls', () => {
  describe('fetchMovie', () => {
    let mockMovieData;
    beforeEach(() => {
      mockMovieData = {
        episode_id: 4,
        title: "A New Hope"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMovieData)
        });
      });
    });

    it('should call fetch with the correct parameters', () => {
      fetchMovie(1);
      expect(window.fetch).toHaveBeenCalledWith(`https://swapi.co/api/films/1`)
    });
    it('should return a response if the status is OK', async () => {
      const result = await fetchMovie(1);
      expect(result).toEqual(mockMovieData);
    });
    it("should return an error is the status is not OK", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      });
      await expect(fetchMovie(1)).rejects.toEqual(Error('Error loading film text'))
    });
  });
  describe('fetchMaster', () => {
    let mockPeopleData = [{name: 'Luke'}]
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPeopleData)
        });
      });
    });

    it('should call fetch with the right parameters', () => {
      fetchMaster('people');
      expect(window.fetch).toHaveBeenCalledWith(`https://swapi.co/api/people/`)
    });

    it('should return a response if the status is OK', async () => {
      const result = await fetchMaster('people');
      expect(result).toEqual(mockPeopleData);
    });

    it("should return an error is the status is not OK", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      });
      await expect(fetchMaster('people')).rejects.toEqual(Error('Error loading people'))
    });
  });
  describe('fetchHomeworld', () => {
    let mockPeople;
    let mockHomeworld;
    beforeEach(() => {
      mockPeople = [{
        name: 'Luke', 
        homeworld: 'https://swapi.co/api/planets/1/'
      }];
      mockHomeworld = { name: 'Tatooine', population: '200000' }
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockHomeworld)
        });
      });   
    });

    it('should call fetch with the correct parameters for each person object', () => {
      fetchHomeworld(mockPeople);
      expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/planets/1/');
    });

    it('should return an array with person objects with the homeworld and population', async () => {
      let mockPromiseResult = [{"homeworld": "Tatooine", "name": "Luke", "population": "200000"}];
      const result = await fetchHomeworld(mockPeople);
      expect(result).toEqual(mockPromiseResult)
    });

    it("should return an error is the status is not OK", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(fetchHomeworld(mockPeople)).rejects.toEqual(
        Error("Error loading homeworld")
      );
    });
  });

  describe("fetchSpecies", () => {
    let mockPeople;
    let mockSpecies;
    beforeEach(() => {
      mockPeople = [
        {
          name: 'Luke',
          species: ['https://swapi.co/api/species/1/']
        }
      ];
      mockSpecies = { name: 'Human' };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSpecies)
        });
      });
    });

    it("should call fetch with the correct parameters for each person object", () => {
      fetchSpecies(mockPeople);
      expect(window.fetch).toHaveBeenCalledWith(
        "https://swapi.co/api/species/1/"
      );
    });

    it("should return an array with person objects with the homeworld and population", async () => {
      let mockPromiseResult = [{ name: "Luke", species: "Human" }];
      const result = await fetchSpecies(mockPeople);
      expect(result).toEqual(mockPromiseResult);
    });

    it("should return an error is the status is not OK", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(fetchSpecies(mockPeople)).rejects.toEqual(
        Error("Error loading species")
      );
    });
  });  

  describe("fetchResidents", () => {
    let mockPlanets;
    let mockResident;
    beforeEach(() => {
      mockPlanets = [
        {
          name: "Alderaan",
          residents: [
            "https://swapi.co/api/people/5/",
          ],
        }
      ];
      mockResident = { name: "Leia Organa" };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResident)
        });
      });
    });

    it("should call fetch with the correct parameters for each person object", () => {
      fetchResidents(mockPlanets);
      expect(window.fetch).toHaveBeenCalledWith(
        "https://swapi.co/api/people/5/"
      );
    });

    it("should return an array of arrays of each planets updated residents", async () => {
      let mockPromiseResult = [[{ 
        name: "Alderaan",
        residentNames: [ "Leia Organa"],
        residents: [ "https://swapi.co/api/people/5/" ], 
      }]];
      const result = await fetchResidents(mockPlanets);
      expect(result).toEqual(mockPromiseResult);
    });

    it("should return an error is the status is not OK", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(fetchResidents(mockPlanets)).rejects.toEqual(
        Error("Error loading residents")
      );
    });
  });    
});