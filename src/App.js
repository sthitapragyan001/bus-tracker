import { useState} from 'react';
import './App.css';
import GPSData from './Components/main_map';
import Navbar from './Components/screens/navbar';
import CollapsibleSidebar from './Components/screens/sidebarnew';

function App() {

  const [mcoord, setcoord] = useState({ lat: 28.549142846755352, lon: 77.1832629396355 })

  for (let index = 0; index < 10; index++) {
    setTimeout(() => {
      let newcoord={ lat: mcoord.lat-0.0001, lon: mcoord.lon+0.0001 }
      setcoord(newcoord)
    }, 2000);
    
  }
  
  return (
    <div className="App" >
      <Navbar/>
      {/* <CollapsibleSidebar /> */}
      <div style={{marginLeft:'5%',marginTop:5}}>
      <GPSData/>
      </div>
    </div>
  );
}

export default App;
