import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

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
  }, [socket])




  return (
    <div className="App">
      <img className='eindhoven' src={require("./images/eindhoven.jpg")} />
      <img className='sun' src={require("./images/sun.png")} style={{display: weather.sunny? 'block' : 'none'}} />
      <div className='clouds' style={{display: weather.cloudy? 'block' : 'none'}}>
        <img className='cloud1' src={require("./images/cloud.png")} />
        <img className='cloud2' src={require("./images/cloud.png")} />
      </div>
      <img className='wind' src={require("./images/wind.png")} style={{display: weather.windy? 'block' : 'none'}} />
      <img className='rain' src={require("./images/rain.gif")} style={{display: weather.rainy? 'block' : 'none'}} />
      <img className='storm' src={require("./images/storm.png")} style={{display: weather.stormy? 'block' : 'none'}} />
    </div>
  );
}

export default App;
