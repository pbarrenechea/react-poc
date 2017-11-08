import React, { Component } from 'react';
import WeatherWidget from './weatherWidget';
import Weather from './lib/weather';

export default class App extends Component {
  render() {
    Weather.updateByCoords();
    return (
      <WeatherWidget />
    );
  }
}
