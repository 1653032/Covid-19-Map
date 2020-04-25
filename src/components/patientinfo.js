import React from "react"
import {Row} from 'react-bootstrap'


const PatientInfo = (props)=>{
    if(props.patient)
        return(
            <div>
                <Row>Name: <span>{props.patient.name}</span></Row>
                <Row>Address: <span>{props.patient.address}</span></Row>
                <Row>Note: <span>{props.patient.note}</span></Row>
                <Row>Group: <span>{props.patient.patientGroup}</span></Row>
            </div>
        );
    else return (
        <div>
            <Row>Name: </Row>
            <Row>Address: </Row>
            <Row>Note : </Row>
            <Row>Group: </Row>
        </div>
    );
}

export default PatientInfo