import { useEffect, useState } from 'react';
import './App.css';
import {Howl, Howler} from 'howler'
import Thunder from './audioclips/Thunder.mp3'
import Rain from './audioclips/Rain.mp3'
import Wind from './audioclips/Wind.mp3'
import Sun from './audioclips/Sun.mp3'

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

  const GetSound = () => {
    switch(true) {
      case weather.sunny: 
        return Sun;
      case weather.cloudy: 
        return Wind;
      case weather.windy: 
        return Wind;
      case weather.rainy: 
        return Rain;
      case weather.stormy: 
        return Thunder;
      default:
        return Sun;
    }
  }

  const PlaySound = (src) => {
    Howler.stop();
    const sound = new Howl({
      src
    })
    sound.play();
  }


  useEffect(() => {
    socket.on("callback", (data) => {
      setWeather(data);
      console.log(weather)
    })

  }, [weather])

  useEffect(() => {
    const src = GetSound();
    PlaySound(src);
  },)



  const AllowSound = () => {
    const src = GetSound();
    PlaySound(src);
  }




  Howler.volume(0.7)

  return (
    <div className="App">
      <button onClick={AllowSound()}>Allow sound</button>
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
