import React, { Component } from 'react';

import CO2Display from '../../components/CO2Display/CO2Display';
import PlannedContent from '../../components/PlannedContent/PlannedContent';
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'

import plannedContentForm from '../../components/PlannedContent/PlannedContentForm';
import categoriesForm from '../../components/PlannedContent/CategoriesForm';

import classes from './Calculator.module.scss';

class Calculator extends Component {

    state = {
        // Feuerwehr, Kita, Schule, Verwaltung, Krankenhäuser, Volkshochschulen, Bauernhöfe, Abfallentsorgung, Energieversorgung
        // Material: Holz, Beton, Recyclingbeton, Hybrid

        // Bauvorhaben, landwirtschaft mobilitaet
        components: {
            id1: {
                opt1: {
                    costs: 8,
                    costType: 'running',
                    label: 'Verkehr',
                    formElement: null,
                    formOptions: null,
                    selected: false,
                    checked: true
                },
                opt2: {
                    costs: 8,
                    costType: 'running',
                    label: 'Verkehr',
                    formElement: null,
                    formOptions: null,
                    selected: false,
                    checked: false
                },
                checked: 'opt1',
                arc: 6,
                arc_pos: null,
            },
            id2: {
                opt1: {
                    costs: 20,
                    costType: 'running',
                    label: 'Industrie',
                    formElement: null,
                    formOptions: null,
                    selected: false,
                    checked: true
                },
                opt2: {
                    costs: 10,
                    costType: 'running',
                    label: 'Industrie',
                    formElement: null,
                    formOptions: null,
                    selected: false,
                    checked: false
                },
                checked: 'opt1',
                arc: 5,
                arc_pos: null,
            },
            id3: {
                opt1: {
                    costs: 2,
                    costType: 'running',
                    label: 'Ernaehrung',
                    formElement: null,
                    formOptions: null,
                    selected: false,
                    checked: true
                },
                opt2: {
                    costs: 2,
                    costType: 'running',
                    label: 'Ernaehrung',
                    formElement: null,
                    formOptions: null,
                    selected: false,
                    checked: false
                },
                checked: 'opt1',
                arc: 4,
                arc_pos: null,
            },
        },
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
        // let cumsum = 0;
        for (const key of Object.keys(updatedComponents)) {
            updatedComponents[key].arc = updatedComponents[key].opt1.costs / this.state.totalBudget * 360;
            // updatedComponents[key].arc_pos = cumsum;
            // cumsum += updatedComponents[key].arc;
        }
        this.setState({
            components: updatedComponents,
            formElement: plannedContentForm,
            formOptions: categoriesForm,
            loaded: true
        })
        this.updateArcs()
    }

    updateArcs = () => {

        const updatedComponents = {...this.state.components}
        let cumsum = 0;
        for (let key of Object.keys(updatedComponents)) {

            let key2 = updatedComponents[key].checked
            const arc = updatedComponents[key][key2].costs/this.state.totalBudget * 360.;
            updatedComponents[key].arc = arc;
            updatedComponents[key].arc_pos = cumsum;
            cumsum += updatedComponents[key].arc
        }
        this.setState({components: updatedComponents})
    }

    onClickHandler = () => {

        const updatedComponents = this.state.components
        // const lastItem = updatedComponents[updatedComponents.length-1]
        const cost = null;
        const id = Math.floor(Math.random()*1000);

        updatedComponents['id'+id] = {
            opt1: {
                costs: cost,
                costType: 'planned',
                label: 'neues Projekt',
                formElement: plannedContentForm,
                formOptions: categoriesForm,
                checked: true,
            },
            opt2: {
                costs: cost,
                costType: 'planned',
                label: 'neues Projekt',
                formElement: plannedContentForm,
                formOptions: categoriesForm,
                checked: false,
            },
            checked: 'opt1',
            arc: cost/this.state.totalBudget * 360,
            arc_pos: 0,
        }
        this.setState({components:updatedComponents},this.updateArcs())
    }

    chooseOptionHandler = (event,id1,id2) => {
        let updatedComponents = {...this.state.components}
        updatedComponents[id1].checked = id2;

        this.setState({components:updatedComponents},this.updateArcs())
    }

    chooseCategoryHandler = () => {
        let updatedComponents = {...this.state.components}
    }

    inputChangedHandler = (event,inputIdentifier,key) => {
        console.log(inputIdentifier)
        console.log(this.state.components[inputIdentifier])

        console.log(event.target.value)

        let updatedComponents = {...this.state.components}
        let updatedElement = {...updatedComponents[inputIdentifier]};
        console.log(updatedElement)
        updatedElement[key].value = event.target.value;

        let costs = null;
        switch (updatedElement[key].value) {
            case 'street':
                costs = 8;
                break;
            case 'build':
                costs = 10;
                break;
            case 'industry':
                costs = 22;
                break;
            case 'parc':
                costs = 12;
                break;
            default:
                costs = null;
        }

        updatedElement[key].costs = costs;
        updatedElement.arc = costs/this.state.totalBudget * 360;
        updatedComponents[inputIdentifier] = updatedElement;
        this.setState({components: updatedComponents, selected: (updatedElement[key].value==='void') ? false : true},this.updateArcs())

    }

    render() {
        let modalContent = <div>
                <p>Informationen zu Massnahme XY</p>
                <p>CO2 Kosten: xxxx</p>
            </div>;
        let plannedContent = null;
        plannedContent = Object.keys(this.state.components).map(key => {
            if ((this.state.components[key].opt1.costType==='planned')) {
                return <PlannedContent
                    key={key}
                    key1={key}
                    id={key}
                    data={this.state.components[key]}
                    inputHandler={this.inputChangedHandler}
                    chooseOptionHandler={this.chooseOptionHandler}/>
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
                Gesamtes CO2 Budget: {this.state.totalBudget}
                {co2Display}
                <div className={classes.AddContent}>
                    <h1>Liste geplanter Massnahmen</h1>
                    {plannedContent}
                    <Button
                        type='add'
                        clicked={this.onClickHandler} />
                </div>
            </div>
        )
    }
}

export default Calculator;
