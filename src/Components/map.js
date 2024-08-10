import React, { useEffect, useState } from 'react'
import './mapstyle.css'
export default function Map(props) {
  const [coord, setcoord] = useState(props.coord)
  const [oldcoord,setoldcoord] =useState(props.coord)
  const updatemap = async () => {
    setcoord(props.coord)
    document.getElementById('mapframe').style.opacity = 0    
    setTimeout(() => {
      document.getElementById('mapframe').style.opacity = 1
      setoldcoord(props.coord)
    }, 500);
    
  }

  useEffect(() => {
    updatemap()
  }, [props.coord])

  return (
    <div className="container_row">
      <div className="layer1" style={{zIndex:1}}>
      <iframe id='backframe' src={`https://maps.google.com/maps?q=${oldcoord.lat},${oldcoord.lon}&hl=en&z=18&t=h&output=embed`} width="1000" height="700" style={{ border: 0, marginTop: 20, opacity: 1 }} allowFullscreen="" />
      </div>
      <div className="layer2" style={{zIndex:2}}>
      <iframe id='mapframe' src={`https://maps.google.com/maps?q=${coord.lat},${coord.lon}&hl=en&z=18&t=h&output=embed`} width="1000" height="700" style={{ border: 0, marginTop: 20, opacity: 0 }} allowTransparency="true" allowFullscreen="" />
      </div>
      
      {/* {loadmap()} */}
      <h1>Bus Live Location</h1>
      {/* <iframe id='mapframe' src={`https://maps.google.com/maps?q=${coord.lat},${coord.lon}&hl=en&z=18&t=h&output=embed`} width="1000" height="700" style={{ border: 0, marginTop: 30, opacity: 0 }} allowFullscreen="" /> */}
    </div>
  )
}