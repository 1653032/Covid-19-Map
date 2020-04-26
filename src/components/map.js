// import React from "react"
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"


// const Markers = (props) => {
//   let markers= new [];
  
//   props.patients.map((patient,index) => 
//     markers.push(
//       <Marker options={{optimized: false}} key={index} position={{ lat: patient['lat'], lng: patient['lng'] }} onClick={props.onClick.bind(null,patient)} index={index}>
//       </Marker>
//     )
//   )

//   return markers;
// }

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `40%`}} />,
//     containerElement: <div style={{ height: `600px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,

//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) => 
//   <GoogleMap
//     defaultZoom={7}
//     defaultCenter={{ lat: 10.7629, lng: 106.6822 }}
//     center={(props.patients)?{lat: props.curPatient.lat,lng: props.curPatient.lng}:{ lat: 10.7629, lng: 106.6822 }}
//   >
//     {Markers(props)}
//   </GoogleMap>
// )

// export default MyMapComponent
import React from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const Markers = (props) => {
  let markers= [];
  
  props.patients.map((patient,index) => 
    markers.push(
      <Marker key={index} position={{ lat: patient['lat'], lng: patient['lng'] }} onClick={props.onClick.bind(null,patient)} index={index}>
      </Marker>
    )
  )

  return markers;
}

const MyMapComponent = (props) => {
    return <Map
    style={{width: '100%',height:'600px'}}
    center={[10.7629,106.6822]} zoom={4}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {Markers(props)}}
    </Map>;
};

export default MyMapComponent;
