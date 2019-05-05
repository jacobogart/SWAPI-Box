import React from 'react';
import { shallow } from "enzyme";
import App from './App';
import * as fetchMethods from "../apiCalls/apiCalls.js";

describe('App', () => {
  let wrapper, instance;

  const defaultState = {
    movie: {},
    error: ""
  };

  beforeEach(() => {
    wrapper = shallow(<App/>)
    instance = wrapper.instance();
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual(defaultState);
  });

  describe('setMovie', () => {
    let mockFetchMovie;
    beforeEach(() => {
    mockFetchMovie = jest.spyOn(fetchMethods, 'fetchMovie');
    });

    afterEach(() => {
      mockFetchMovie.mockClear();
    });

    it('should invoke fetchMovie with a random number between one and seven', () => {
      instance.setMovie();
      expect(mockFetchMovie).toHaveBeenCalled();
      expect(mockFetchMovie.mock.calls[0][0]).toBeGreaterThan(0);
      expect(mockFetchMovie.mock.calls[0][0]).toBeLessThan(8);
    });

    it('should invoke convertEpisodeId once the fetch is resolved', async () => {
      instance.convertEpisodeId = jest.fn();
      await instance.setMovie();
      expect(instance.convertEpisodeId).toHaveBeenCalled();
    });

    it('should set the movie property of state', async () => {
      await instance.setMovie();
      expect(wrapper.state("movie")).toHaveProperty('title', 'subTitle', 'text');
    });
  });

  describe('convertEpisodeId', () => {
    it('should return a numbers coresponding Roman numeral', () => {
      expect(instance.convertEpisodeId(1)).toEqual('I');
    })
  })
});


