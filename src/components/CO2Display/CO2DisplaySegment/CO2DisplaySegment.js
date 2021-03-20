import React from 'react';

import classes from './CO2DisplaySegment.module.scss'

const co2DisplaySegment = (props) => {

    const classAdd = [classes.Slice];
    if (props.clicked) {
        classAdd.push(classes.Clicked)
    }
    const styleAdd = props.hovered ? '1px dashed black' : null

    // onMouseOver={(event) => props.mouseOverHandler(event,props.options.id)}
    // onClick={(event) => props.clickHandler(event,props.options.id)}
    console.log(props.data)
    return (
        <div
            className={classAdd.join(' ')}
            style={{
                transform: 'rotate('+ props.data.arc_pos + 'deg) skewY(' + (props.data.arc - 90) + 'deg)',
                background: (props.data.costType==='planned') ? 'green' : 'red',
            }}>
        </div>
    )
};

export default co2DisplaySegment;
