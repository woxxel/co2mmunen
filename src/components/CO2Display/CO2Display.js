import React from 'react';

import CO2DisplaySegment from './CO2DisplaySegment/CO2DisplaySegment';
// import MonitoringInfo from './MonitoringInfo/MonitoringInfo';

import classes from './CO2Display.module.scss'


const CO2Display = (props) => {

    let info = null;
    let segments = Object.keys(props.data).map(key => {
        if (props.data[key].costs!==null) {
            return <CO2DisplaySegment
                key={key}
                data={props.data[key]}
                mouseOverHandler={props.mouseOverHandler}
                clickHandler={props.clickHandler}
                clicked={props.clickedID===props.data[key].id}
                hovered={props.hoverID===props.data[key].id} />
        } else {
            return null
        }
    })

    return (
        <div>
            <div
                className={classes.Pie}>
                {segments}
            </div>
            {info}
        </div>
    )
}

export default CO2Display;
