import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const REACT_APP_OWM_API_ROOT = process.env.REACT_APP_OWM_API_ROOT;
const REACT_APP_OWM_API_VERSION = process.env.REACT_APP_OWM_API_VERSION;
const REACT_APP_OWM_API_KEY = process.env.REACT_APP_OWM_API_KEY;

promisePolyfill.polyfill();

function getCurrentWeather(lat, lon) {
    return fetch(`${REACT_APP_OWM_API_ROOT}/data/${REACT_APP_OWM_API_VERSION}/weather?lat=${lat}&lon=${lon}&appid=${REACT_APP_OWM_API_KEY}`, {
      method: 'GET',
      redirect: 'follow'
    }).then((response) => {
      return response.json();
    }).catch(error => console.log('error', error));
  }

  function getForecast(lat, lon) {
    return fetch(`${REACT_APP_OWM_API_ROOT}/data/${REACT_APP_OWM_API_VERSION}/forecast?lat=${lat}&lon=${lon}&appid=${REACT_APP_OWM_API_KEY}`, {
      method: 'GET',
      redirect: 'follow'
    }).then((response) => {
      return response.json();
    }).catch(error => console.log('error', error));
  }

  export default {
    getCurrentWeather,
    getForecast
  };