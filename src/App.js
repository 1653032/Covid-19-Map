import React from 'react';
import './App.css';
import './components/map.js'
import MyMapComponent from './components/map.js';
import 'leaflet/dist/leaflet.css';
import {Container,Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientInfo from './components/patientinfo.js'
import PatientList from './components/patientlist.js'
import Seekbar from './components/seekbar.js'
import moment from 'moment'


function compare(a,b){
  let date1 = new Date(a.verifyDate);
  let date2 = new Date(b.verifyDate);

  return (date1<date2) - (date1>date2);
}

class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
      patients: null,
      curPatient: null,
      patientListRef: null,
      startDate: "2019-12-08T00:00:00",
      curDate: null,
      activePatients: null,
      activeRefs: null,
      autoplay: false,
      seekValue: 0,
      intervalValue: 1000,
    };
    this.interval = null;
    this.onMarkerClicked = this.onMarkerClicked.bind(this);
    this.onSeekbarChange = this.onSeekbarChange.bind(this);
    this.onAutoClicked = this.onAutoClicked.bind(this);
    this.onIntervalChange = this.onIntervalChange.bind(this);
  }

  onMarkerClicked(patient){
    const patientIndex = patient.index;

    this.state.patientListRef[parseInt(patientIndex)].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    this.setState({
      curPatient: this.state.patients[patientIndex]
    })
  }

  onIntervalChange(value){
    this.setState({
        intervalValue: value
    })

    if(this.interval){
      clearInterval(this.interval);
      this.interval = this.interval= setInterval(()=>{this.onSeekbarChange(this.state.seekValue+1)},this.state.intervalValue);
    }
  }

  onAutoClicked(){
    const newState = !this.state.autoplay;
    
    if(newState){
      this.interval= setInterval(()=>{this.onSeekbarChange(this.state.seekValue+1)},this.state.intervalValue);
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }

    this.setState({
      autoplay: newState
    })
  }

  componentDidMount() {
    fetch("https://cors-anywhere.herokuapp.com/maps.vnpost.vn/apps/covid19/api/patientapi/list",
    {Headers: new Headers({
      'Origin': 'localhost:3000'
    })})
    .then(res => res.json())
    .then(
      (result) => {
        let sortedData = result.data.slice().sort(compare);
        let refs = Array(result.data.lenght).fill(React.createRef())

        sortedData.forEach((patient,index)=>{
          patient['index'] = index
        })

        let activePatients = sortedData.reduce((acc,value)=>{
          if(moment(value.verifyDate).isBefore(this.state.startDate)){
            acc.push(value);
          }
          return acc;
        },[]);

        this.setState({
          patients: sortedData,
          patientListRef: refs,
          activePatients: activePatients,
          curDate: sortedData[0].verifyDate,
        })
      },
    )
  } 

  onSeekbarChange(steps){
    const newCurDate = moment(this.state.startDate).add(steps,'days');
    const newrefs = [];
    const newActivePatients = this.state.patients.reduce((acc,value,index)=>{
      if(moment(value.verifyDate).isBefore(newCurDate) || value.verifyDate === newCurDate){
        acc.push(value);
        newrefs.push(this.state.patientListRef[index]);
      }
      return acc;
    },[])

    this.setState({
      curDate: steps,
      activePatients: newActivePatients,
      activeRefs: newrefs,
      seekValue: steps
    })
  }

  render(){
    return (
      <div className="App">
        <Container style={{maxWidth:'1500px'}}>
          <Row>
            <Col lg={8}>
            <div className="display-4 text-md-center">Corona's Patient Map</div>
              <div>
              {this.state.patients && <MyMapComponent onClick={this.onMarkerClicked} patients={this.state.activePatients} curPatient={this.state.curPatient || this.state.patients[0]}/>}
              </div>
            </Col>
            <Col lg={4}>
              <div className="display-4 text-md-center">Patient Info</div>
              <Row style={{wordWrap: 'normal',overflowY:'auto',paddingLeft:'15px',Height:'150px',lineHeight:'20px'}}>
                <div style={{width:'100%',height:'100%'}}>
                  <PatientInfo patient={this.state.curPatient}></PatientInfo>
                </div>
              </Row>
              <br/>
              <div className="display-4 text-md-center">Patients List</div>
              <Row  style={{height: '300px',lineHeight:'25px'}}>
                <div style={{width:'100%',height:'100%'}}>
                {this.state.patients && <PatientList list={this.state.patientListRef} onClick={this.onMarkerClicked} curPatient={this.state.curPatient || this.state.patients[0]} patients={this.state.activePatients}></PatientList>}
                </div>
              </Row>
            </Col>
          </Row>
          <Row>
            <div className="display-4 text-md-center" style={{paddingBottom:'85px'}}>Date slider</div>
            {this.state.patients && <Seekbar intervalChange={this.onIntervalChange} autoplay={this.state.autoplay} onAutoClicked={this.onAutoClicked} value={this.state.seekValue} onChange={this.onSeekbarChange} startDate={this.state.startDate} endDate={this.state.patients[0].verifyDate}></Seekbar>}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
