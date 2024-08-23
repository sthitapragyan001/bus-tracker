import React, { useEffect, useState } from 'react';
import axios from 'axios'; // npm install axios
// import MapLeaflet from './map_leaflet';
import MapLeaflet from './map_leaflet';
const GPSData = () => {
  const [latitude, setLatitude] = useState(28.54592009357561);
  const [longitude, setLongitude] = useState(77.1857909916675);
  const ADAFRUIT_IO_USERNAME = 'arnav_abhishek_';
  const ADAFRUIT_IO_KEY = 'aio_hmGk90o36NDNc8PwKozKQwojhZrT';

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

      setLatitude(locationResponse.data[0].lat);
      setLongitude(locationResponse.data[0].lon);
    } catch (error) {
      console.log(error)
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGPSData(); // Initial fetch
    const interval = setInterval(fetchGPSData, 1500); // Fetch every 1 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [latitude,longitude]);
  
  if (latitude!=='0' && longitude!=='0') {
    // data lagging alternate
    return (
      <div>
        <MapLeaflet coord={{ lat: latitude.toString(), lon: longitude.toString() }} />
      </div>
    );
  }
  // [ latitude, longitude ]
  // variables storing lat and long
};

export default GPSData;