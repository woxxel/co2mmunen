import React from 'react';

import CO2DisplaySegment from './CO2DisplaySegment/CO2DisplaySegment';
// import MonitoringInfo from './MonitoringInfo/MonitoringInfo';

import classes from './CO2Display.module.scss'


const CO2Display = (props) => {

    let info = null;
    let segments = Object.keys(props.data).map(key => {

        const key2 = props.data[key].checked;
        console.log(key2)

        if (props.data[key][key2].costs!==null) {
            return <CO2DisplaySegment
                key={key}
                data={props.data[key][key2]}
                arc={props.data[key].arc}
                arc_pos={props.data[key].arc_pos}
                mouseOverHandler={props.mouseOverHandler}
                clickHandler={props.clickHandler}
                clicked={props.clickedID===key}
                hovered={props.hoverID===key} />
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
