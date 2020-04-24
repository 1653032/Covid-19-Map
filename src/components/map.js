import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `40%`}} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,

  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: 10.7629, lng: 106.6822 }}
    center={(props.patients)?{lat: props.curPatient.lat,lng: props.curPatient.lng}:{ lat: 10.7629, lng: 106.6822 }}
  >
    {props.patients.map((patient,index) => 
      <Marker options={{optimized: false}} key={index} position={{ lat: patient['lat'], lng: patient['lng'] }} onClick={props.onClick.bind(null,patient)} index={index}>
        {/* <InfoWindow>
          <div>{patient['name']}</div>
        </InfoWindow> */}
      </Marker>
    )}
  </GoogleMap>
)

export default MyMapComponent