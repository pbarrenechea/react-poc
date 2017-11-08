function attachScript(url) {
  let s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}

export default class Weather {

  static updateByCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const reqUrl = `http://api.openweathermap.org/data/2.5/find?callback=weatherResponse&lat=${pos.lat}&lon=${pos.lng}&appid=964429c5ea0499644b0e4ac356613126`;
        attachScript(reqUrl);
      });
    }
  }

  static updateByCity(city) {
    const reqUrl = `http://api.openweathermap.org/data/2.5/find?callback=weatherResponse&q=${city}&appid=964429c5ea0499644b0e4ac356613126`;
    attachScript(reqUrl);
  }
}
