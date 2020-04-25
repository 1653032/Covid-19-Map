import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function formatEntry(props,patient){
    const patientVerifyDate = new Date(patient.verifyDate)
    const dateString = patientVerifyDate.getDate() + '/' + patientVerifyDate.getMonth() + '/' + patientVerifyDate.getFullYear();
    return (
    <li ref={(ref) => {props.list[patient.index] = ref}} key={patient.index}>
        <button className={"btn btn-default btn-block" + (props.curPatient === patient?" btn-primary":" btn-outline-secondary")} onClick={props.onClick.bind(null,patient)}>
            {patient.name} Date:{dateString}
        </button>
    </li>)
}

function PatientList(props){
    let entries = [];

    props.patients.map((patient,index)=>{
        entries.push(formatEntry(props,patient))
    })

    if(props.patients)
        return(
            <ul style={{listStyleType:'none',overflow:'auto',maxHeight:'329px'}}>
                {entries}
            </ul>
        )
    else return null;
}

export default PatientList