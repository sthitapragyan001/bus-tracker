import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import busico from './markers/bus_marker.png'
import usrico from './markers/user_loc_marker.png'
import bus_stop_loc from './bus_stops_data';
import bstp from './markers/bus_stop.png'
import buspath from './output_path';

export default function MapLeaflet(props) {

  const haversine = require('haversine-distance');
  const [coord, setcoord] = useState({ lat: parseFloat(props.coord.lat), lon: parseFloat(props.coord.lon) })
  const [mapcenter, setmapcenter] = useState([28.54596301484667, 77.19319704919322])
  const [fly, setfly] = useState(false)
  const [previousIndex, setpreviousIndex] = useState(null)

  const updatemap = async () => {
    let closestIndex;
    let point={"latitude":parseFloat(props.coord.lat),"longitude":parseFloat(props.coord.lon)}
    if (previousIndex === null) {
      // First iteration: Search the entire path
      let minDistance = Infinity;
      buspath.forEach((coord, index) => {
        const distance = haversine(point, coord);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      })
    } 
    else {
      // Subsequent iterations: Search within 10 points of the previous closest point
      const startIndex = Math.max(previousIndex - 10, 0);
      const endIndex = Math.min(previousIndex + 10, buspath.length - 1);

      let minDistance = Infinity;
      for (let i = startIndex; i <= endIndex; i++) {
        const distance = haversine(point, buspath[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
    }
    let closestPoint = buspath[closestIndex];
    // console.log({ lat: closestPoint.latitude, lon: closestPoint.longitude })
    setcoord({ lat: closestPoint.latitude, lon: closestPoint.longitude })
    setpreviousIndex(closestIndex)
  }
  const movemap = async () => {
    let hdist = Math.abs((parseFloat(coord.lon) - mapcenter[1])) * 340000
    let vdist = Math.abs((parseFloat(coord.lat) - mapcenter[0])) * 340000

    if (hdist > (window.innerWidth * 0.9) || vdist > (window.innerHeight * 0.9)) {
      setmapcenter([parseFloat(coord.lat), parseFloat(coord.lon)])
      setfly(true)
    }
  }

const busicon = new Icon({
  iconUrl: busico,
  iconSize: [70, 80],
  iconAnchor: [35,70]

})
const usricon = new Icon({
  iconUrl: usrico,
  iconSize: [45, 45],

})
const bstpicon = new Icon({
  iconUrl: bstp,
  iconSize: [80, 80],

})
useEffect(() => {
  updatemap()
  movemap()
}, [props.coord, mapcenter])

// getting user location
const [position, setPosition] = useState(null);
function FlyMapTo() {
  const map = useMap()
  useEffect(() => {
    map.flyTo(mapcenter)
    setfly(false)
  }, [mapcenter])
}

useEffect(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  } else {
    console.log("Geolocation is not available in your browser.");
  }
}, [props.coord]);
return (
  <MapContainer style={{ height: window.innerHeight * 0.9, width: window.innerWidth * 0.9 }} center={[mapcenter[0], mapcenter[1]]} zoom={17} scrollWheelZoom={true}>
    <TileLayer
      // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {position && <Marker position={[position.latitude, position.longitude]} icon={usricon}>
      <Popup>
        You are here
      </Popup>
    </Marker>}
    <Marker id='bus' position={[coord.lat, coord.lon]} icon={busicon}>
      <Popup>
        Your Bus is here
      </Popup>
      {/* <Circle center={[coord.lat+0.00003, coord.lon-0.00005]} radius={10} fillColor='blue' /> */}
    </Marker>
    {bus_stop_loc.map((bsl) => {
      // console.log(bsl)
      return (
        <Marker id={bsl.name} position={[bsl.latitude, bsl.longitude]} icon={bstpicon}>
          <Popup>
            Bus stop : {bsl.name}
          </Popup>
        </Marker>)
    })}
    {fly && <FlyMapTo />}
  </MapContainer>
)
}

