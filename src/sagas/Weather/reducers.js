import { Map } from 'immutable';

import {
  GET_CURRENT_WEATHER_START,
  GET_CURRENT_WEATHER_ERROR,
  GET_CURRENT_WEATHER_SUCCESS,

  GET_FORECAST_START,
  GET_FORECAST_ERROR,
  GET_FORECAST_SUCCESS
} from './actions';

const initialState = Map({
  currentWeatherLoad: false,
  currentWeatherData: {},
  currentWeatherError: false,

  forecastLoad: false,
  forecastData: {},
  forecastError: false
});

const actionsMap = {
  [GET_CURRENT_WEATHER_START]: (state) => {
    return state.merge(Map({
      currentWeatherData: {},
      currentWeatherLoad: true,
      currentWeatherError: false
    }));
  },
  [GET_CURRENT_WEATHER_ERROR]: (state) => {
    return state.merge(Map({
      currentWeatherData: {},
      currentWeatherLoad: false,
      currentWeatherError: true,
    }));
  },
  [GET_CURRENT_WEATHER_SUCCESS]: (state, action) => {
    return state.merge(Map({
      currentWeatherData: action.response,
      currentWeatherLoad: false,
      currentWeatherError: false,
    }));
  },

  [GET_FORECAST_START]: (state) => {
    return state.merge(Map({
      forecastData: {},
      forecastLoad: true,
      forecastError: false
    }));
  },
  [GET_FORECAST_ERROR]: (state) => {
    return state.merge(Map({
      forecastData: {},
      forecastLoad: false,
      forecastError: true,
    }));
  },
  [GET_FORECAST_SUCCESS]: (state, action) => {
    return state.merge(Map({
      forecastData: action.response,
      forecastLoad: false,
      forecastError: false,
    }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}