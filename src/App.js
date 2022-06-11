import { useEffect, useState } from 'react';
import './App.css';

const { io } = require('socket.io-client');
const socket = io.connect("https://glow-websocket-server.herokuapp.com");

const defaultWeather = {
  sunny: true,
  cloudy: false,
  windy: false,
  rainy: false,
  stormy: false
}

function App() {

  const [weather, setWeather] = useState({...defaultWeather});

  useEffect(() => {
    socket.on("callback", (data) => {
      setWeather(data);
      console.log(weather)
    })
  }, [weather])




  return (
    <div className="App">
      <img alt="eindhoven" className='eindhoven' src={require("./images/eindhoven.jpg")} />
      <img alt="sun"  className='sun' src={require("./images/sun.png")} style={{display: weather.sunny? 'block' : 'none'}} />
      <div className='clouds' style={{display: weather.cloudy? 'block' : 'none'}}>
        <img alt="clouds" className='cloud1' src={require("./images/cloud.png")} />
        <img alt="clouds" className='cloud2' src={require("./images/cloud.png")} />
      </div>
      <img alt="wind" className='wind' src={require("./images/wind.png")} style={{display: weather.windy? 'block' : 'none'}} />
      <img alt="rain" className='rain' src={require("./images/rain.gif")} style={{display: weather.rainy? 'block' : 'none'}} />
      <img alt="storm" className='storm' src={require("./images/storm.png")} style={{display: weather.stormy? 'block' : 'none'}} />
    </div>
  );
}

export default App;
