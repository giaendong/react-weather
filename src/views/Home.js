import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getCurrentWeather, getForecast } from '../sagas/Weather/actions';

import Loader from './global/Loader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    };

    window.addEventListener("resize", this.update.bind(this));
  }

  componentDidMount() {
    const { getCurrentWeather, getForecast } = this.props;
    this.update();
    navigator.geolocation.getCurrentPosition(position => {
        getCurrentWeather(position.coords.latitude, position.coords.longitude);
        getForecast(position.coords.latitude, position.coords.longitude);
      });
  }

  update() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  randomRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }
  
  createRain(nbDrop, type) {
    let rainArray = [];
    for(let i=1; i < nbDrop; i++) {
      const dropLeft = this.randomRange(0,this.state.width);
      const dropTop = this.randomRange(0 - (this.state.height*2), this.state.height);
      rainArray.push(<div className={type} key={i} id={`drop${i}`} style={{left: dropLeft, top: dropTop}} />)
    }
    return rainArray;
  }

  renderForecast(single, index) {
    const { weather: [{icon}]} = single;
    let styling = '';
    if (icon === '01d' || icon === '02d' || icon === '03d' || icon === '10d' || icon === '13d') {
      styling = 'list-group-item list-group-item-warning';
    }
    if (icon === '04d' || icon === '09d' || icon === '50d' || icon === '50n') {
      styling = 'list-group-item list-group-item-info';
    }
    if (icon === '01n' || icon === '02n' || icon === '03n' || icon === '04n' || icon === '09n' || icon === '13n') {
      styling = 'list-group-item list-group-item-secondary';
    }
    if (icon === '10n' || icon === '11d' || icon === '11n') {
      styling = 'list-group-item list-group-item-dark';
    }
    return <li key={single.dt} className={styling}>
      <span>
        <img 
          src={`http://openweathermap.org/img/wn/${single.weather[0].icon}.png`} 
          alt={single.weather[0].description}/>
      </span>{`${moment.unix(single.dt).format('ddd, MMM Do - h a')} - ${single.weather[0].description}`}</li>
  }

  render() {
    const { currentWeatherLoad, currentWeatherData, forecastLoad, forecastData } = this.props;
    let bgId = '';
    let typeId = '';
    let dropCount = 0;
    if ( currentWeatherData.weather ) {
      const { weather: [{icon}]} = currentWeatherData;
      if (icon === '01d' || icon === '02d' || icon === '03d' || icon === '10d' || icon === '13d') {
        bgId = 'id-clear-day';
      }
      if (icon === '04d' || icon === '09d' || icon === '50d' || icon === '50n') {
        bgId = 'id-dark-day';
      }
      if (icon === '01n' || icon === '02n' || icon === '03n' || icon === '04n' || icon === '09n' || icon === '13n') {
        bgId = 'id-clear-night';
      }
      if (icon === '10n' || icon === '11d' || icon === '11n') {
        bgId = 'id-dark';
      }
      if (icon === '13d') {
        typeId = 'snow';
        dropCount = 500;
      }
      if (icon === '11d' || icon === '11n') {
        typeId = 'rain';
        dropCount = 500;
      }
      if (icon === '10d' || icon === '10n' ) {
        typeId = 'rain';
        dropCount = 250;
      }
      if (icon === '09d' || icon === '09n' ) {
        typeId = 'rain';
        dropCount = 100;
      }
    }
    if (currentWeatherLoad || forecastLoad || !currentWeatherData.name) {
        return (
        <div className='main-wrapper'>
            <Loader />
        </div>
    )}
    return (
        <div className='main-wrapper'>
            <div id={bgId} className='main-background'>
              {
                typeId ? <div className='rain'>{this.createRain(dropCount, typeId)}</div> : null
              }
              <div className='main-card'>
                <h4>{moment.unix(currentWeatherData.dt).format('LLLL')}</h4>
                <h1>{`${currentWeatherData.name}, ${currentWeatherData.sys.country} - ${currentWeatherData.weather ? currentWeatherData.weather[0].description : '-'} `}
                {
                currentWeatherData.weather ?
                  <span>
                    <img 
                      src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} 
                      alt='icons'/>
                  </span> : null
                }
                </h1>
                <div className='row justify-content-center text-center'>
                  <div className='col-auto'>
                    <h5>Temp: {`${(currentWeatherData.main.temp - 273.15).toFixed(1)}\xB0 C`}</h5>
                  </div>
                  <div className='col-auto'>
                    <h5>Humidity: {currentWeatherData.main.humidity}</h5>
                  </div>
                  <div className='col-auto'>
                    <h5>Wind Speed: {`${currentWeatherData.wind.speed} - ${currentWeatherData.wind.deg}\xB0`}</h5>
                  </div>
                </div>
                <div className='row justify-content-center'>
                  <ul className='list-group next-day-list'>
                    {
                      forecastData.list ? forecastData.list.map((single, index) => {
                        return this.renderForecast(single, index);
                      }) : null
                    }
                  </ul>
                </div>
              </div>
            </div>
        </div>
    )}
}

// redux providing state takeover
const mapStateToProps = (state) => {
    return {
      currentWeatherLoad: state.weather.get('currentWeatherLoad'),
      currentWeatherData: state.weather.get('currentWeatherData'),
      currentWeatherError: state.weather.get('currentWeatherError'),

      forecastLoad: state.weather.get('forecastLoad'),
      forecastData: state.weather.get('forecastData'),
      forecastError: state.weather.get('forecastError')
    }
}
export default connect(mapStateToProps, {getCurrentWeather, getForecast})(Home)