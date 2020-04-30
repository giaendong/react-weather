export const GET_CURRENT_WEATHER_START = 'GET_CURRENT_WEATHER_START';
export const GET_CURRENT_WEATHER_ERROR = 'GET_CURRENT_WEATHER_ERROR';
export const GET_CURRENT_WEATHER_SUCCESS = 'GET_CURRENT_WEATHER_SUCCESS';

export function getCurrentWeather(lat, lon) {
    return {
      type: GET_CURRENT_WEATHER_START,
      lat,
      lon
    };
  }


  export const GET_FORECAST_START = 'GET_FORECAST_START';
  export const GET_FORECAST_ERROR = 'GET_FORECAST_ERROR';
  export const GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS';
  
  export function getForecast(lat, lon) {
      return {
        type: GET_FORECAST_START,
        lat,
        lon
      };
    }