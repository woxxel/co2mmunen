import React, { Component } from 'react';

import CO2Display from '../../components/CO2Display/CO2Display';
import PlannedContent from '../../components/PlannedContent/PlannedContent';
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'

import classes from './Calculator.module.scss';

class Calculator extends Component {

    state = {
        components: [
            {
                id: 1,
                costs: 8,
                arc: 0,
                arc_pos: 0,
                costType: 'running'
            },
            {
                id: 2,
                costs: 10,
                arc: 0,
                arc_pos: 0,
                costType: 'running'
            },
            {
                id: 3,
                costs: 2,
                arc: 0,
                arc_pos: 0,
                costType: 'running'
            },
            {
                id: 4,
                costs: 18,
                arc: 0,
                arc_pos: 0,
                costType: 'running'
            },
        ],
        totalBudget: 100,
        hoverID: null,
        clickedID: null,
        loaded: false,
        openModal: false
    }

    openModalHandler = () => {
        this.setState({openModal: true})
    }
    closeModalHandler = () => {
        this.setState({openModal: false})
    }

    mouseOverHandler = (event,id) => {
        this.setState({hoverID: id})
    }
    clickHandler = (event,id) => {
        this.setState({clickedID: (this.state.clickedID===id) ? null : id})
    }

    componentDidMount() {

        const updatedComponents = this.state.components
        let cumsum = 0;
        for (let i=0;i<updatedComponents.length;i++) {
            updatedComponents[i].arc = updatedComponents[i].costs / this.state.totalBudget * 360;
            updatedComponents[i].arc_pos = cumsum;
            cumsum += updatedComponents[i].arc;
        }
        this.setState({
            components: updatedComponents,
            loaded: true
        })
    }

    onClickHandler = () => {
        const updatedComponents = this.state.components
        const lastItem = updatedComponents[updatedComponents.length-1]
        const cost = Math.floor(Math.random()*20);

        updatedComponents.push({
            id: lastItem.id+1,
            costs: cost,
            arc: cost/this.state.totalBudget * 360,
            arc_pos: lastItem.arc_pos + lastItem.arc,
            costType: 'planned'
        })
        this.setState({components:updatedComponents})
    }

    render() {

        let modalContent = null;
        let plannedContent = null;
        plannedContent = this.state.components.map(comp => {
            if ((comp.costType==='planned')) {
                return <PlannedContent
                    key={comp.id}
                    id={comp.id}
                    data={comp} />
            } else {
                return null;
            }
        })

        // let modalContent = <div>
        //     <h1>Progress on sustainability on SDG {this.state.clickedID}</h1>
        // </div>

        let co2Display = null;
        if (this.state.loaded) {
            co2Display = <CO2Display
                data={this.state.components}/>
        }
        return (
            <div
            className={classes.Calculator}>
                <Modal
                    show={this.state.openModal}
                    modalCancelled={this.closeModalHandler}>
                    {modalContent}
                </Modal>
                {co2Display}
                <div className={classes.AddContent}>
                    <h1>Liste geplanter Massnahmen</h1>
                    {plannedContent}
                    <Button
                        type='add'
                        clicked={this.onClickHandler}/>
                </div>
            </div>
        )
    }
}

export default Calculator;
