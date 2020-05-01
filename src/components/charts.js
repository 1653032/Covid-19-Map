import {defaults, Line} from 'react-chartjs-2'
import React from 'react';
import {Row,Col, Container} from 'react-bootstrap'

class Charts extends React.Component {
    constructor(props){
        super(props);

        this.state={
            vnData: null,
            vnLabels: null,
            gbData: null,
            gbLabels: null
        }
    }

    componentDidMount() {
        fetch("https://td.fpt.ai/corona/corona-chart-vn.json")
        .then(res => res.json()).then(result=> {
            let labels = Object.keys(result);
            let Infected = labels.map(key => result[key][0]);
            let Dead = labels.map(key => result[key][1]);
            let Cured = labels.map(key => result[key][2]);

            //Because the requirement stated 'When navigate to /stats display two line charts about COVID-19 statistics of Vietnam and the World from Dec 08'19 to the current date'
            labels.unshift('Ngày 8/12');
            Infected.unshift(0);
            Dead.unshift(0);
            Cured.unshift(0);

            this.setState({
                vnData: {
                    labels: labels,
                    datasets: [{
                        label: 'Nhiễm',
                        data: Infected,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(201, 38, 38,1)',
                        borderColor: 'rgba(201, 38, 38,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    },{
                        label: 'Cách ly',
                        data: Dead,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,0.4)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        
                    },{
                        label: 'Khỏi bệnh',
                        data: Cured,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(38, 201, 38,1)',
                        borderColor: 'rgba(38, 201, 38,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    }]
                }
            });
        });

        fetch("https://td.fpt.ai/corona/corona-total.json")
        .then(res => res.json()).then(result=> {
            let labels = Object.keys(result);
            let Infected = labels.map(key => result[key][0]);
            let Dead = labels.map(key => result[key][1]);
            let Cured = labels.map(key => result[key][2]);
            this.setState({
                gbData: {
                    labels: labels,
                    datasets: [{
                        label: 'Infected',
                        data: Infected,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(201, 38, 38,1)',
                        borderColor: 'rgba(201, 38, 38,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    },{
                        label: 'Dead',
                        data: Dead,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,0.4)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        
                    },{
                        label: 'Cured',
                        data: Cured,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(38, 201, 38,1)',
                        borderColor: 'rgba(38, 201, 38,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    }]
                }
            }
            );
        })
    };

    render(){
        return(
            <Container style={{maxWidth:'1500px'}}>
                <div className="display-4 text-md-center">Corona Stats</div>
                <br/><br/>
            <Row>
                <Col lg={6}>
                <p class="text-center">Số ca mắc, cách ly và khỏi bệnh của Việt Nam</p>
                    {this.state.vnData && <Line
                        data={this.state.vnData}>
                    </Line>}
                </Col>
                <Col lg={6}>
                <p class="text-center">World's Corona Cases (Infected/Dead/Cured)</p>
                    {this.state.vnData && <Line
                        data={this.state.gbData}>
                    </Line>}
                </Col>
            </Row>
            </Container>
        );
    }
}

export default Charts