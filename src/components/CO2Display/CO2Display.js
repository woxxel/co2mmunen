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
        <div
            className={classes.Pie}>
            {segments}
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
