import React, { useEffect, useState } from 'react';
import axios from 'axios'; // npm install axios
// import MapLeaflet from './map_leaflet';
import MapLeaflet from './map_leaflet';
import buspath from './output_path';
import bus_stop_loc from './bus_stops_data';

const haversine = require('haversine-distance');
const GPSData = () => {
  const [latitude, setLatitude] = useState(28.545396761347078);
  const [longitude, setLongitude] = useState(77.18716496818183);
  const [busav, setbusav] = useState('Inoperative')
  const [eta, seteta] = useState(null)
  const ADAFRUIT_IO_USERNAME = process.env.REACT_APP_ADAFRUIT_IO_USERNAME;
  const ADAFRUIT_IO_KEY = process.env.REACT_APP_ADAFRUIT_IO_KEY;
  const [closestbusstop, setclosestbusstop] = useState([null, Infinity]);
  const [udistance, setUdistance] = useState(Infinity);
  const [nextstop, setNextstop] = useState(null);
  const [nsd, setnsd] = useState(null);
  const bus_stop_length = bus_stop_loc.length;
  const fetchGPSData = async () => {
    try {
      // const latitudeUrl = `https://io.adafruit.com/api/v2/arnav_abhishek_/feeds/latitude/data`
      const locationUrl = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/latitude/data`;

      const headers = {
        'X-AIO-Key': ADAFRUIT_IO_KEY
      };

      const [locationResponse] = await Promise.all([
        axios.get(locationUrl, { headers, params: { limit: 1 } }),
      ]);
      // let latitudedata= await fetch(latitudeUrl)
      // let latdata= await latitudedata.json()
      // let longitudedata= await fetch(longitudeUrl)
      // let londata= await longitudedata.json()
      let closestIndex;
      let point = { "latitude": parseFloat(locationResponse.data[0].lat), "longitude": parseFloat(locationResponse.data[0].lon) }
      //let speed = parseFloat(locationResponse.data[0].ele)
      let speed=25;
      let modtime = new Date(locationResponse.data[0].created_at)
      let curr = new Date();
      let busav = 'Inoperative';
      if (modtime.toDateString() === curr.toDateString()) {
        if (modtime.getHours() === curr.getHours()) {
          if ((parseInt(curr.getMinutes()) - parseInt(modtime.getMinutes())) < 3) {
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
      let nudistance;
      if (cbs < bus_stop_length - 1) {
        let ustop = bus_stop_loc[cbs + 1];
        let ucoord = { "latitude": parseFloat(ustop.latitude), "longitude": parseFloat(ustop.longitude) };
        nudistance = haversine(closestPoint, ucoord);
        if (minDistance2 > closestbusstop[1]) {
          if (nudistance < udistance) {
            setNextstop(ustop.name);
            let nsd = nudistance
            setnsd(nsd)
          }
          else {
            let dstop = bus_stop_loc[cbs - 1];
            let dcoord = { "latitude": parseFloat(dstop.latitude), "longitude": parseFloat(dstop.longitude) };
            let ddistance = haversine(closestPoint, dcoord);
            setNextstop(dstop.name);
            let nsd = ddistance
            setnsd(nsd)
          }
        }
        else if (minDistance2 < closestbusstop[1]) {
          setNextstop(cstop.name);
          let nsd = minDistance2
          setnsd(nsd)
        }
      }
      else {
        if (minDistance2 < closestbusstop[1]) {
          setNextstop(cstop.name);
          let nsd = minDistance2
          setnsd(nsd)
        }
        else {
          let dstop = bus_stop_loc[cbs - 1];
          let dcoord = { "latitude": parseFloat(dstop.latitude), "longitude": parseFloat(dstop.longitude) };
          let ddistance = haversine(closestPoint, dcoord);
          setNextstop(dstop.name);
          let nsd = ddistance
          setnsd(nsd)
        }
      }
      if (speed === 0 || speed === null) {
        speed = 25
      }
      let t = nsd / (speed * 100 / 6);
      
      let tim;
      if (t < 1) {
        tim = (t * 60).toFixed(0) + ' sec'
      }
      else {
        tim = (t).toFixed(1) + ' mins'
      }
      setbusav(busav)
      setUdistance(nudistance)
      seteta(tim)
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
    const interval = setInterval(fetchGPSData, 1000); // Fetch every 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [latitude, longitude]);

  if (parseInt(latitude) !== 0 && parseInt(longitude) !== 0) {
    // data lagging alternate
    return (
      <div >
        <div className='row' style={{ width: '96%', margin: '2.2%', justifySelf: 'center' }}>
          {busav === 'Running' && <div className='col-md'>
            <h4>Next Stop: <mark>{nextstop}</mark></h4>
          </div>}
          {busav === 'Inoperative' && <div className='col-md'>
            <h4 style={{fontSize:20,marginLeft:35}}><mark>Bus is currently Inoperative</mark></h4>
          </div>}
          {busav === 'Running' && <div className='col-md'>
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
  else {
    if (busav === 'Running') {
      return (
        <div>
          <h4><mark>Loading...</mark></h4>
          <MapLeaflet coord={null} />
        </div>
      );

    }
    else {
      return (
        <div>
          {busav === 'Inoperative' && <div className='col-md'>
            <h4><mark>Bus is currently Inoperative</mark></h4>
            <MapLeaflet coord={null} />
          </div>}
        </div>
      );
    }
  }
  // [ latitude, longitude ]
  // variables storing lat and long
};

export default GPSData;