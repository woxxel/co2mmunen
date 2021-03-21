import React, { Component } from 'react';

import CO2Display from '../../components/CO2Display/CO2Display';
import PlannedContent from '../../components/PlannedContent/PlannedContent';
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import classes from './Calculator.module.scss';

class Calculator extends Component {

    state = {
        hoverID: null,
        clickedID: null,
        loaded: false,
        openModal: false
    }

    mouseOverHandler = (event,id) => {
        this.setState({hoverID: id})
    }
    clickHandler = (event,id) => {
        this.setState({clickedID: (this.state.clickedID===id) ? null : id})
    }

    componentDidMount() {
        // this.props.loaded = true;
        this.props.updateCosts()
        this.setState({loaded: true})
    }


    render() {
        let modalContent = <div>
                <p>Informationen zu Massnahme XY</p>
                <p>CO2 Kosten: xxxx</p>
            </div>;
        let plannedContent = null;
        plannedContent = Object.keys(this.props.proj).map(id => {
            if ((this.props.proj[id].costType==='planned')) {
                return <PlannedContent
                    key={id}
                    id={id}
                    inputHandler={this.inputChangedHandler} />
            } else {
                return null;
            }
        })

        // console.log(this.state)
        // if (this.state.clickedID) {
        //     modalContent = <div>
        //             <p>Some information about the clicked thing</p>
        //             <p>CO2 Kosten: {this.state.components[this.state.clickedID.costs]}</p>
        //         </div>
        // }
        // modalContent = null;
        //     <h1>Progress on sustainability on SDG {this.state.clickedID}</h1>
        // </div>

        let co2Display = null;
        if (this.state.loaded) {
            co2Display = <CO2Display
                data={this.state.components}
                clickHandler={this.openModalHandler} />
        }
        return (
            <div
            className={classes.Calculator}>
                <Modal
                    show={this.state.openModal}
                    modalCancelled={this.closeModalHandler}>
                    {modalContent}
                </Modal>

                <div className={classes.Header}>
                    <div
                        style={{
                            width: '60%',
                            padding: 'auto',
                            paddingLeft: '0'
                        }}>
                        <h1>Steuerungstool fuer Klima-bewusste Gemeinden</h1>
                    </div>
                    <div
                        style={{
                            margin: 'auto 0'
                        }}>
                        <img src='/assets/images/TengenLogo.png' alt='city Logo'/>
                    </div>
                </div>
                <div className={classes.Overview}>
                    {co2Display}
                    <div className={classes.TextSummary}>
                        <p>Gesamtes CO2 Budget fuer 2022: {this.props.budget}</p>
                        <p>Bereits genutztes CO2-Budget: {this.props.currentBudget}</p>
                        <p>Noch verfuegbares CO2-Budget: {this.props.budget-this.props.currentBudget}</p>
                        <button
                            className={classes.BtnAddProject}
                            onClick={this.props.addProject}>Projekt hinzufuegen</button>
                    </div>
                </div>
                <div className={classes.AddContent}>
                    <h1>Projektplanung</h1>
                    {plannedContent}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loaded: state.loaded,
        proj: state.planning.projects,
        budget: state.planning.totalBudget,
        currentBudget: state.planning.currentBudget
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCosts: () => dispatch(actions.update_costs()),
        addProject: () => dispatch(actions.add_project())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Calculator);
