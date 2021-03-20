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
                costType: 'running',
                label: 'Verkehr',
                formElement: null,
                formOptions: null,
                selected: false
            },
            {
                id: 2,
                costs: 10,
                arc: 0,
                arc_pos: 0,
                costType: 'running',
                label: 'Industrie',
                formElement: null,
                formOptions: null,
                selected: false
            },
            {
                id: 3,
                costs: 2,
                arc: 0,
                arc_pos: 0,
                costType: 'running',
                label: 'Ernaehrung',
                formElement: null,
                formOptions: null,
                selected: false
            },
            {
                id: 4,
                costs: 18,
                arc: 0,
                arc_pos: 0,
                costType: 'running',
                label: 'Lieferketten',
                formElement: null,
                formOptions: null,
                selected: false
            },
        ],
        totalBudget: 100,
        hoverID: null,
        clickedID: null,
        loaded: false,
        openModal: false
    }

    openModalHandler = () => {
        console.log('clicked')
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
            costType: 'planned',
            label: 'neues Projekt'
        })
        this.setState({components:updatedComponents})
    }

    render() {

        let modalContent = <div>
                <p>Informationen zu Massnahme XY</p>
                <p>CO2 Kosten: xxxx</p>
            </div>;
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
                clickHandler={this.openModalHandler}/>
        }
        return (
            <div
            className={classes.Calculator}>
                <Modal
                    show={this.state.openModal}
                    modalCancelled={this.closeModalHandler}>
                    {modalContent}
                </Modal>
                Gesamtes CO2 Budget: {this.state.totalBudget}
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
