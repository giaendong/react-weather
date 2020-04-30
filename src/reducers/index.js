import {combineReducers} from 'redux';
import weather from '../sagas/Weather/reducers';

export default combineReducers({
    weather
})