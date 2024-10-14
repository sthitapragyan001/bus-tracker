import React, { useEffect, useState } from 'react';
import axios from 'axios'; // npm install axios
// import MapLeaflet from './map_leaflet';
import MapLeaflet from './map_leaflet';
import buspath from './output_path';
import bus_stop_loc from './bus_stops_data';

const haversine = require('haversine-distance');
const GPSData = () => {
  const [latitude, setLatitude] = useState(28.54592009357561);
  const [longitude, setLongitude] = useState(77.1857909916675);
  const [speed, setspeed] = useState(20)
  const [modtime, setmodtime] = useState(null)
  const [busav, setbusav] = useState('Inoperative')
  const [eta, seteta] = useState(null)
  const ADAFRUIT_IO_USERNAME = 'arnav_abhishek_';
  const ADAFRUIT_IO_KEY = 'aio_Cclw60UE183p4OXCnS1F2Uamf5X6';
  const [closestbusstop, setclosestbusstop] = useState([null, Infinity]);
  const [udistance, setUdistance] = useState(Infinity);
  const [nextstop, setNextstop] = useState(null);
  const [nextstopdistance, setnextstopdistance] = useState(0)
  const bus_stop_length = bus_stop_loc.length;
  const fetchGPSData = async () => {
    try {
      // const latitudeUrl = `https://io.adafruit.com/api/v2/arnav_abhishek_/feeds/latitude/data`
      const locationUrl = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/latitude/data`;

      const headers = {
        'X-AIO-Key': ADAFRUIT_IO_KEY
      };

      const [locationResponse] = await Promise.all([
        axios.get(locationUrl, { headers }),
      ]);
      // let latitudedata= await fetch(latitudeUrl)
      // let latdata= await latitudedata.json()
      // let longitudedata= await fetch(longitudeUrl)
      // let londata= await longitudedata.json()
      let closestIndex;
      let point = { "latitude": parseFloat(locationResponse.data[0].lat), "longitude": parseFloat(locationResponse.data[0].lon) }
      let speed = parseFloat(locationResponse.data[0].ele)
      let modtime = new Date(locationResponse.data[0].created_at)
      let curr = new Date();
      let busav='Inoperative';
      if ( modtime.toDateString() === curr.toDateString()) {
        if (modtime.getHours() === curr.getHours()) {
          if ((parseInt(curr.getMinutes()) - parseInt(modtime.getMinutes()))<3) {
            busav = 'Running'
          }
          else {
            busav = 'Inoperative'
          }
        }
      }
      let minDistance = Infinity;
      buspath.forEach((coord, index) => {
        const distance = haversine(point, coord);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      })
      let closestPoint = buspath[closestIndex];

      let cbs = null;
      let minDistance2 = Infinity;
      bus_stop_loc.forEach((stop, index) => {
        let coord = { "latitude": parseFloat(stop.latitude), "longitude": parseFloat(stop.longitude) }
        const distance = haversine(closestPoint, coord);
        if (distance < minDistance2) {
          minDistance2 = distance;
          cbs = index;
        }
      })
      let cstop = bus_stop_loc[cbs];
      let nsd;
      let nudistance;
      if (cbs < bus_stop_length-1) {
        let ustop = bus_stop_loc[cbs + 1];
        let ucoord = { "latitude": parseFloat(ustop.latitude), "longitude": parseFloat(ustop.longitude) };
        nudistance = haversine(closestPoint, ucoord);
        if ((minDistance2 > closestbusstop[1]) && (nudistance < udistance)) {
          setNextstop(ustop.name);
          nsd = nudistance
        }
        else if ((minDistance2 > closestbusstop[1]) && (nudistance > udistance)) {
          let dstop = bus_stop_loc[cbs - 1];
          let dcoord = { "latitude": parseFloat(dstop.latitude), "longitude": parseFloat(dstop.longitude) };
          let ddistance = haversine(closestPoint, dcoord);
          setNextstop(dstop.name);
          nsd = ddistance
        }
        else if (minDistance2 <= closestbusstop[1]) {
          setNextstop(cstop.name);
          nsd = minDistance2
        }
      }
      else {
        if (minDistance2 < closestbusstop[1]) {
          setNextstop(cstop.name);
          nsd = minDistance2
        }
        else {
          let dstop = bus_stop_loc[cbs - 1];
          let dcoord = { "latitude": parseFloat(dstop.latitude), "longitude": parseFloat(dstop.longitude) };
          let ddistance = haversine(closestPoint, dcoord);
          setNextstop(dstop.name);
          nsd = ddistance
        }
      }
      let t = nsd / (speed * 100 / 6);
      let tim;
      if (t < 1) {
        tim = (t * 60).toFixed(0) + ' sec'
      }
      else {
        tim = (t).toFixed(1)+' mins'
      }
      setbusav(busav)
      // console.log(speed)
      setnextstopdistance(nsd)
      setUdistance(nudistance)
      setspeed(speed)
      if (speed === 0 || speed === null) {
        seteta('N/A')
      }
      else {
        seteta(tim)
      }
      setmodtime(modtime)
      setclosestbusstop([cstop.name, minDistance2]);
      setLatitude(closestPoint.latitude);
      setLongitude(closestPoint.longitude);
    } catch (error) {
      console.log(error)
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGPSData(); // Initial fetch
    const interval = setInterval(fetchGPSData, 500); // Fetch every 0.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [latitude, longitude]);

  if (latitude !== '0' && longitude !== '0') {
    // data lagging alternate

    return (
      <div >
        <div className='row' style={{width:'96%',margin:'2%',justifySelf:'center'}}>
          {busav==='Running'&&<div className='col-md'>
          <h4>Next Stop: <mark>{nextstop}</mark></h4>
          </div>}
          {<div className='col-md'>
          <h4>Status: <mark>{busav}</mark></h4>
          </div>}
          {busav==='Running'&&<div className='col-md'>
          <h4>Estimated Arrival Time:<mark>{eta}</mark></h4> 
          </div>}
          {/* <div className='col-sm'>
          <h4>Distance to Next Stop: <mark>{nextstopdistance.toFixed(0)} m</mark></h4>
          </div>
          <div className='col-sm'>
          <h4>Speed: <mark>{speed} km/hr</mark></h4>   
          </div> */}
        </div>
        <MapLeaflet coord={{ lat: latitude.toString(), lon: longitude.toString() }} />
      </div>
    );
  }
  // [ latitude, longitude ]
  // variables storing lat and long
};

export default GPSData;