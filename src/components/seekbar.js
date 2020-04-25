import React from 'react';
import {Slider} from '@material-ui/core'
import 'moment'
import moment from 'moment';
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
        <Slider
        classes={{
            valueLabel: 'value-label',
            rail: 'rail',
            track: 'track'
        }}
        defaultValue={0}
        min={0}
        max={maxVal}
        marks={marks}
        onChange={(event,value)=>props.onChange(value)}
        valueLabelFormat={(x => moment(startDateFormatted).add(x,'days').format('DD/MM/YYYY'))}
        valueLabelDisplay={'on'}
        step={1}
        ></Slider>
    )
}

export default Seekbar