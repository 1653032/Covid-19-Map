import React from 'react';
import {Slider, Typography} from '@material-ui/core'
import 'moment'
import moment from 'moment';
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/seekbar.css'

function Seekbar (props) {
    const startDateFormatted = moment(props.startDate);
    const maxVal = moment(props.endDate).diff(startDateFormatted,'days');
    const marks = [
        {
            value: 0,
            label: startDateFormatted.format('DD/MM/YYYY')
        },
        {
            value: maxVal,
            label: moment(startDateFormatted).add(maxVal,'days').format('DD/MM/YYYY')
        }
    ];

    return(
        <div className={'col-12'}>
            <Row>
                <Slider
                style={{pointerEvents: props.autoplay === true?'none':'auto',opacity:props.autoplay === true?'0.4':'1.0'}}
                classes={{
                    valueLabel: 'value-label',
                    rail: 'rail',
                    track: 'track'
                }}
                defaultValue={0}
                min={0}
                max={maxVal}
                marks={marks}
                value={props.value}
                onChange={(event,value)=>{props.onChange(value)}}
                valueLabelFormat={(x => moment(startDateFormatted).add(x,'days').format('DD/MM/YYYY'))}
                valueLabelDisplay={'on'}
                step={1}
                ></Slider>
            </Row>
            <br></br>
            <Row>
                <button style={{width:'150px'}}  className="btn btn-info btn-lg" onClick={()=>props.onAutoClicked()}>
                    Autoplay
                </button>
                <div style={{marginLeft:'50px', width:'200px'}}>
                    <Typography id="intervalLabel" gutterBottom>
                        Autoplay interval
                    </Typography>
                    <Slider 
                        defaultValue={1000}
                        style={{left:'5px'}}
                        onChange={(event,value) => props.intervalChange(value)}
                        max={1000}
                        min={50}
                        reverse={'true'}
                        step={50}
                        valueLabelDisplay="auto"
                        aria-labelledby="intervalLabel"
                    />
                </div>
            </Row>
        </div>
    )
}

export default Seekbar