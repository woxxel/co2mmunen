import React, { Component } from 'react';

import CO2Display from '../../components/CO2Display/CO2Display';
import PlannedContent from '../../components/PlannedContent/PlannedContent';
import Modal from '../../components/UI/Modal/Modal'

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

        // <div className={classes.AddContent}>
        //     <h1>Projektplanung</h1>
        //
        // </div>
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
        let projectsAdded = !plannedContent.reduce((acc,el) => el===null & acc, true)
        // console.log(plannedContent)
        // console.log(element)
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

                <p><em>Diese Anwendung ist derzeit in der Entwicklungsphase und wird zunächst durch keinerlei wissenschaftliche Daten gespeist. Sie haben Interesse an unserer Arbeit? Kontaktieren Sie uns: <a href='mailto::info@co2mmunen.de'>info@co2mmunen.de</a></em></p>
                <div className={classes.Header}>
                    <div className={classes.HeaderText}>
                        <h1>Steuerungstool für Klimabewusste Gemeinden</h1>
                    </div>
                    <div className={classes.HeaderLogo}>
                        <img src='/assets/images/TengenLogo.png' alt='city Logo'/>
                    </div>
                </div>
                <div className={classes.Overview}>
                    <div className={classes.OverviewContent}>
                        {co2Display}
                        <div className={classes.TextSummary}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Gesamtes CO2-Budget für 2022:</td>
                                        <td>{this.props.budget} kT</td>
                                    </tr>
                                    <tr>
                                        <td>Bereits genutztes CO2-Budget:</td>
                                        <td>{this.props.currentBudget} kT</td>
                                    </tr>
                                    <tr>
                                        <td>Noch verfügbares CO2-Budget:</td>
                                        <td>{this.props.budget-this.props.currentBudget} kT</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button
                        className={classes.BtnAddProject}
                        onClick={this.props.addProject}>Projekt hinzufügen</button>
                    </div>
                </div>
                {projectsAdded ?
                <div className={classes.AddContent}>
                    <h1>Projektplanung</h1>
                    {plannedContent}
                </div> : null}
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
