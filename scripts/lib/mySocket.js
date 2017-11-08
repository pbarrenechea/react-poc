
export default class MySocket {

  constructor() {
    const locationURI = 'ws://demos.kaazing.com/echo';
    this.websocket; // eslint-disable-line no-use-before-define
    this.ready = false;
    try {
      this.websocket = new WebSocket(locationURI);

      this.websocket.onopen = evt => {
        console.log('CONNECTED');
        this.ready = true;
      };

      this.websocket.onmessage = evt => {
        const data = evt.data;
        if (typeof (data) === 'string' ) {
          console.log(`RECEIVED TEXT: ${data}`);
          let event = new CustomEvent('socketResponse');
          document.dispatchEvent(event);
        }
      };

      this.websocket.onclose = function (evt) {
        console.log(`CLOSED: ${evt.code} ${evt.reason}`);
      };
    } catch (e) {
      console.log(`EXCEPTION: ${e}`);
    }
  }

  sendMessage(txt) {
    if( this.ready ){
      this.websocket.send(txt);
    }

  }

}
