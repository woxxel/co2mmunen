import React from 'react';

import classes from './CO2DisplaySegment.module.scss'

const co2DisplaySegment = (props) => {

    const classAdd = [classes.Slice];
    if (props.clicked) {
        classAdd.push(classes.Clicked)
    }
    // const styleAdd = props.hovered ? '1px dashed black' : null

    // onMouseOver={(event) => props.mouseOverHandler(event,props.options.id)}
    // onClick={(event) => props.clickHandler(event,props.options.id)}
    // console.log(props)
    return (
        <div
            className={classAdd.join(' ')}
            style={{
                transform: 'rotate('+ props.arc_pos + 'deg) skewY(' + (props.arc - 90) + 'deg)',
                background: (props.data.costType==='planned') ? 'green' : 'red',
            }}
            onClick={(event) => props.clickHandler(event,props.data.id)}>
        </div>
    )
};

export default co2DisplaySegment;
