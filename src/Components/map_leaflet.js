import React from 'react'
import { MapContainer, TileLayer, Marker, Popup,Circle } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import busico from './markers/bus_marker.png'
import usrico from './markers/user_loc_marker.png'
import bus_stop_loc from './bus_stops_data';
import bstp from './markers/bus_stop.png'

export default function Map_leaflet(props) {
    const [coord, setcoord] = useState(props.coord)
    const updatemap = async () => {
        setcoord(props.coord)
    }
    const busicon = new Icon({
        iconUrl: busico,
        iconSize: [75, 85],

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
    }, [props.coord])

    // getting user location
    const [position, setPosition] = useState({ latitude: '28', longitude: '77' });

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
        <div style={{ margin: '5%' }}>
            <MapContainer style={{ height: '700px', width: '1200px' }} center={[28.545795, 77.187416]} zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[position.latitude, position.longitude]} icon={usricon}>
                    <Popup>
                        You are here
                    </Popup>
                </Marker>
                <Marker position={[coord.lat, coord.lon]} icon={busicon}>
                    <Popup>
                        Your Bus is here
                    </Popup>
                <Circle center={[coord.lat-0.00015, coord.lon]} radius={10} fillColor='blue'/>
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

            </MapContainer>
        </div>

    )
}
