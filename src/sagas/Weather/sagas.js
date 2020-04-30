import { take, fork, call, put } from 'redux-saga/effects';
import weather from '../../apis/weather';
import {
  GET_CURRENT_WEATHER_START,
  GET_CURRENT_WEATHER_ERROR,
  GET_CURRENT_WEATHER_SUCCESS,

  GET_FORECAST_START,
  GET_FORECAST_ERROR,
  GET_FORECAST_SUCCESS
} from './actions';

function* getCurrentWeather(lat, lon) {
  try {
    const response = yield call(weather.getCurrentWeather, lat, lon);
    if (response) {
      yield put({ type: GET_CURRENT_WEATHER_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (e) {
    yield put({ type: GET_CURRENT_WEATHER_ERROR, e });
  }
}

function* watchGetCurrentWeather() {
  while (true) {
    const {lat, lon} = yield take(GET_CURRENT_WEATHER_START);
    yield fork(getCurrentWeather, lat, lon);
  }
}

function* getForecast(lat, lon) {
    try {
      const response = yield call(weather.getForecast, lat, lon);
      if (response) {
        yield put({ type: GET_FORECAST_SUCCESS, response });
      } else {
        throw response; // throw the err response
      }
    } catch (e) {
      yield put({ type: GET_FORECAST_ERROR, e });
    }
  }
  
  function* watchGetForecast() {
    while (true) {
      const {lat, lon} = yield take(GET_FORECAST_START);
      yield fork(getForecast, lat, lon);
    }
  }

  
export default function* authSagas() {
  yield fork(watchGetCurrentWeather);
  yield fork(watchGetForecast);
}
