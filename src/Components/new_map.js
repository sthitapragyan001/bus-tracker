import React, { useEffect, useState } from 'react';
import * as Paho from 'paho-mqtt';
import MapLeaflet from './map_leaflet';

const GPSData = () => {
  const [latitude, setLatitude] = useState(true);
  const [longitude, setLongitude] = useState(true);
  const mqtt_server = 'test.mosquitto.org'
  const mqtt_port = 1883
  const mqtt_topic = "ppg_mad_sensor/data101"
  const [messages, setMessages] = useState();


  useEffect(() => {
    const client = new Paho.Client(mqtt_server, mqtt_port,mqtt_server);
    client.connect({
      onSuccess() {
        console.log('Connected')
        client.subscribe(mqtt_topic);
      },
    });


    client.onMessageArrived = (message) => {
      const payload = message.payloadString;
      console.log('payload')
      console.log(payload)
      setMessages(payload);
    };
  }, []);

  if (latitude && longitude) {
    // data lagging alternate
    return (
      <div>
        {console.log("this is the message ")}
        {console.log(messages)}
        {/* <MapLeaflet coord={{ lat: latitude.toString(), lon: longitude.toString() }} /> */}
      </div>
    );
  }
  // [ latitude, longitude ]
  // variables storing lat and long
};

export default GPSData;