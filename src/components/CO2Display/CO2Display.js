import React from 'react';

import CO2DisplaySegment from './CO2DisplaySegment/CO2DisplaySegment';
// import MonitoringInfo from './MonitoringInfo/MonitoringInfo';

import classes from './CO2Display.module.scss'


const CO2Display = (props) => {

    let info = null;
    // let info = props.clickedID ? <MonitoringInfo
    //                 id={props.clickedID}
    //                 openModal={props.openModalHandler}/> : null;
    let segments = props.data.map(comp => {
        if (comp.costs!==null) {
            console.log(comp);
            return <CO2DisplaySegment
                key={comp.id}
                data={comp}
                mouseOverHandler={props.mouseOverHandler}
                clickHandler={props.clickHandler}
                clicked={props.clickedID===comp.id}
                hovered={props.hoverID===comp.id} />
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
