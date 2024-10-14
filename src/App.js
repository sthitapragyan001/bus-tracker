import { useState,useEffect} from 'react';
import './App.css';
import GPSData from './Components/main_map';
import Navbar from './Components/screens/navbar';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import JourneySoFar from './Components/journeysofar';
import TeamStructure from './Components/team';

function App() {
  const [navhead,setnavhead] = useState('Bus Tracker IITD')
  useEffect(() => {
    const updateNavhead = () => {
    let pathname = window.location.hash;
    if (pathname === '/') {
      setnavhead('Bus Tracker IITD')
      }
    else if (pathname === '#/Live_Location') {
      setnavhead('Bus Tracker IITD')
      }
    else if (pathname === '#/Bus_Schedule') {
    setnavhead('Bus Schedule')
    }
    else if (pathname === '#/About_Us') {
    setnavhead('Our Team')
    }
    else if (pathname === '#/Journey_so_far') {
    setnavhead('Our Journey')
    }
    else if (pathname === '#/Bus_stops') {
    setnavhead('Bus Stops')
    }
  };
    // Update navhead on initial render
    updateNavhead();

    // Add event listener for hash changes
    window.addEventListener('hashchange', updateNavhead);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', updateNavhead);
    };
  }, []);
  
  
  return (
    <div className="App" >
      <Navbar heading={navhead}/>
      <Router> 
      {/* <CollapsibleSidebar /> */}
      <div style={{marginLeft:'2%',marginRight:'2%'}}>
      <Routes>
        <Route exact path='/' element={<GPSData/>}/>
        <Route exact path='/Live_Location' element={<GPSData/>}/>
        <Route exact path='/Bus_Schedule' element={<iframe title='bus_sch' className='pdf' src={require('./Components/screens/Bus_Schedule.pdf')} width={'90%'} style={{ marginTop:'4vh',height:'80vh'}}/>}/>
        <Route exact path='/About_Us' element={<TeamStructure />}/>
        <Route exact path='/Journey_so_far' element={<JourneySoFar/>}/>
        <Route exact path='/Bus_stops' element={<img className='busstops' src={require('./Components/screens/bus_route.jpeg')} />}/>
        {/* <Route path='*' element={<GPSData/>}/> */}
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
