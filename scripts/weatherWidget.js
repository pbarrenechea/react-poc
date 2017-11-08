import React, { Component } from 'react';
import Weather from './lib/weather';
import MySocket from './lib/mySocket';

export default class WeatherWidget extends Component {

  constructor() {
    super();
    this.state = {
      value: 'Write the name of a city here',
      weatherObj: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWeatherEvent = this.handleWeatherEvent.bind(this);
    this.handleSocketEvent = this.handleSocketEvent.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    Weather.updateByCity(this.state.value);
  }

  handleWeatherEvent(event) {
    if( event.details ){
      this.state.weatherObj = event.details.list[0];
      this.socket.sendMessage(`${this.state.weatherObj.main.temp_max}`);
      this.socketSendDate = new Date();
    }

  }

  handleSocketEvent(event) {
    const socketResponseDate = new Date();
    const diff = (socketResponseDate.getTime() - this.socketSendDate.getTime()) / 1000;
    console.log(event);
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 150);
    ctx.font="14px Arial";
    ctx.fillText(`${this.state.weatherObj.name} has hight of ${this.state.weatherObj.main.temp_max} and low of ${this.state.weatherObj.main.temp_min}`, 0, 50);
    ctx.fillText(`websocket took ${diff} seconds to return message`, 0, 100);
  }

  componentDidMount() {
    this.socket = new MySocket();
    document.addEventListener('weather', this.handleWeatherEvent);
    document.addEventListener('socketResponse', this.handleSocketEvent);
  }

  render() {
    return (
      <div className="weatherWidget">
        <h2 >Weather Widget</h2>
        <canvas ref="canvas" width={500} height={150} />
        <input  type="text" value={this.state.value} onChange={this.handleChange} />
        <button  onClick={this.handleSubmit}>Update</button>
      </div>
    );
  }

}
