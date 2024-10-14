import { useState} from 'react';
import './App.css';
import GPSData from './Components/main_map';
import Navbar from './Components/screens/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Router>
      <Navbar/>
      {/* <CollapsibleSidebar /> */}
      <div style={{marginLeft:'2%',marginTop:'1%',marginRight:'2%'}}>
      <Routes>
        <Route exact path='/' element={<GPSData/>}/>
        <Route exact path='/Live_Location' element={<GPSData/>}/>
        <Route exact path='/Bus_Schedule' element={<iframe title='bus_sch' className='pdf' src={require('./Components/screens/Bus_Schedule.pdf')} width={'90%'} style={{ marginTop:'4vh',height:'80vh'}}/>}/>
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
