import React from 'react';

import CO2DisplaySegment from './CO2DisplaySegment/CO2DisplaySegment';
// import MonitoringInfo from './MonitoringInfo/MonitoringInfo';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './CO2Display.module.scss'


const CO2Display = (props) => {

    // let info = null;
    let segments = Object.keys(props.proj).map(id => {

        const option = props.proj[id].checked;

        if (props.proj[id][option].costs!==null) {
            return <CO2DisplaySegment
                key={id}
                data={props.proj[id]}
                mouseOverHandler={props.mouseOverHandler}
                clickHandler={props.clickHandler}
                clicked={props.clickedID===id}
                hovered={props.hoverID===id} />
        } else {
            return null
        }
    })

    return (
        <div >
            <div
                className={classes.Pie}>
                {segments}
            </div>
            <div style={{display: 'block', margin: '1rem'}}>
                <div className={classes.Legend}>
                    <div className={classes.LegendNoise}></div><p>laufende CO2 Emissionen</p>
                </div>
                <div className={classes.Legend}>
                    <div className={classes.LegendProjects}></div><p>CO2 Emissionen durch geplante Projekte</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        proj: state.planning.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inOptionSelected: (id,option) => dispatch(actions.select_option)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CO2Display);
