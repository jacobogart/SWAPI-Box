import React from "react";
import { shallow } from "enzyme";
import PeopleContainer from './PeopleContainer';
import * as fetchMethods from "../apiCalls/apiCalls.js";

describe('PeopleContainer', () => {
  const defaultState = {
    people: [],
    error: "",
    isLoading: true
  };

  let wrapper, instance;
  let mockPeople = [
    {
      homeworld: "https://swapi.co/api/planets/1/",
      species: ["https://swapi.co/api/species/1/"]
    }
  ];

  let mockUnformatedPeople = [{
    name: 'Luke',
    homeworld: 'Tat',
    population: '0',
    species: 'Human',
    keyToRemove: 'test'
  }]
  beforeEach(()=> {
    wrapper = shallow(<PeopleContainer/>);
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual(defaultState);
  });

  describe("setPeople", () => {
    let mockfetchMaster, mockFetchHomeworld, mockFetchSpecies;
    beforeEach(() => {
      mockfetchMaster = jest.spyOn(fetchMethods, 'fetchMaster');
      mockFetchHomeworld = jest.spyOn(fetchMethods, "fetchHomeworld");
      mockFetchSpecies = jest.spyOn(fetchMethods, "fetchSpecies");
    });

    afterEach(() => {
      mockfetchMaster.mockClear();
      mockFetchHomeworld.mockClear();
      mockFetchSpecies.mockClear();
    });
    
    it('should invoke fetchMaster when setPeople is called', () => {
      instance.setPeople();
      expect(mockfetchMaster).toHaveBeenCalled();
    });

    it("should invoke fetchHomeworld after fetchMaster is resolved", async () => {
      await mockfetchMaster();
      expect(mockFetchHomeworld).toHaveBeenCalled();
    });

    it("should invoke fetchSpecies after fetchHomeworld is resolved", async () => {
      await mockFetchHomeworld(mockPeople);
      expect(mockFetchSpecies).toHaveBeenCalled();
    });

    it.skip("should invoke formatPerson after fetchSpecies is resolved", async () => {
      instance.formatPerson = jest.fn();
      await mockFetchSpecies(mockPeople);
      expect(instance.formatPerson).toHaveBeenCalled();
    });

    it.skip('should set state to the error message on failure', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await instance.setPeople();
      expect(wrapper.state('error')).toEqual('Error');
    });
  });

  describe('formatPerson', () => {
    it('should set state poperty of people to an array of formated people objects', () => {
      instance.formatPerson(mockUnformatedPeople);
      expect(wrapper.state('people')).toHaveLength(1);
    });

    it('should format person object correctly', () => {
      instance.formatPerson(mockUnformatedPeople);
      let statePerson = wrapper.state("people")[0];
      expect(statePerson).toHaveProperty(...Object.keys(mockUnformatedPeople[0]), 'key');
    });

    it('should set state poperty isLoading to false', () =>{
      instance.formatPerson(mockUnformatedPeople);
      expect(wrapper.state("isLoading")).toEqual(false);
    })
  });
});