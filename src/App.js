import { useState,useEffect } from 'react';
import './App.css';
import Map from './Components/map';
import Map_leaflet from './Components/map_leaflet';
import GPSData from './Components/main_map';

function App() {

  const [mcoord, setcoord] = useState({ lat: 28.549142846755352, lon: 77.1832629396355 })

  for (let index = 0; index < 10; index++) {
    setTimeout(() => {
      let newcoord={ lat: mcoord.lat-0.0001, lon: mcoord.lon+0.0001 }
      setcoord(newcoord)
    }, 2000);
    
  }
  
  return (
    <div className="App">
      {/* <Map coord={{ lat: mcoord.lat.toString(), lon: mcoord.lon.toString() }} /> */}
    {/* <Map_leaflet coord={{ lat: mcoord.lat.toString(), lon: mcoord.lon.toString() }}/> */}
    <GPSData/>
    </div>
  );
}

export default App;
