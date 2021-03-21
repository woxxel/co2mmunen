import React, { Component } from 'react';


import Input from '../../UI/Input/Input'
import ExampleProject from './ExampleProject';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import classes from './PlannedContentItem.module.scss';

class PlannedContentItem extends Component {

    render () {

        // let input = null;
        let inputCategories = null;
        let examples = null;

        const proj = this.props.proj[this.props.id][this.props.option]

        let input = <div>
            <Input
                value={proj.formProject.value}
                label={proj.formProject.label}

                elementType={proj.formProject.elementType}
                elementConfig={proj.formProject.elementConfig}

                invalid={!proj.formProject.valid}
                shouldValidate={proj.formProject.validation}
                touched={proj.formProject.touched}

                changed={(event) => this.props.onProjectSelected(event,this.props.id, this.props.option)}
                />
        </div>

        if (proj.formProject.value!=='void') {
            const categories = Object.values(proj.formOptions).map(opt => {
                return <Input
                key={opt.key}
                id={opt.key}
                value={opt.value}
                label={opt.label}

                elementType={opt.elementType}
                elementConfig={opt.elementConfig}

                invalid={!opt.valid}
                shouldValidate={opt.validation}
                touched={opt.touched}

                changed={(event) => this.props.onCategoryChanged(event,this.props.id,this.props.option,opt.key)}
                />
            })

            let modalContent = null;
            modalContent = <ExampleProject />
                // <h1>Kindertagesstaette</h1>
                // <img>

            inputCategories = <div
                className={classes.SelectCategories}>
                {categories}
            </div>
                examples = <div className={classes.ReferenceItems}>
                    <p>Ähnliche Projekte:</p>
                    <div
                        className={classes.ExampleItems}>
                        <div
                            className={classes.ExampleItem}>
                            <img
                                src='/assets/images/kita1.jpeg'
                                alt='example'
                                onClick={() => this.props.openModal(modalContent)} />
                            <div>
                                <button>Als Referenz</button>
                                <p>CO2: {Math.floor(Math.random()*30)}kT</p>
                            </div>
                        </div>
                        <div
                            className={classes.ExampleItem}>
                            <img
                                src='/assets/images/kita2.jpeg'
                                alt='example'
                                onClick={() => this.props.openModal(modalContent)} />
                            <div>
                                <button>Als Referenz</button>
                                <p>CO2: {Math.floor(Math.random()*30)}kT</p>
                            </div>
                        </div>
                        <div
                            className={classes.ExampleItem}>
                            <img
                                src='/assets/images/kita3.jpeg'
                                alt='example'
                                onClick={() => this.props.openModal(modalContent)}/>
                            <div>
                                <button>Als Referenz</button>
                                <p>CO2: {Math.floor(Math.random()*30)}kT</p>
                            </div>
                        </div>
                    </div>
                </div>
        }

        let classAdd = [classes.PlannedContent]
        let symbol = <i className="far fa-times-circle fa-3x" style={{color:'red'}} ></i>

        if (this.props.proj[this.props.id].checked===this.props.option) {
            classAdd.push(classes.Checked)
            symbol = <i className="far fa-check-circle fa-3x" style={{color:'green'}}></i>
        }

        return (
            <div
                className={classAdd.join(' ')}>
                <div
                    className={classes.Changer}
                    onClick={() => this.props.onOptionSelected(this.props.id,this.props.option)}>
                    {(proj.formProject.value!=='void') ? symbol : null}
                </div>
                {input}
                {inputCategories}
                <hr/>
                {examples}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        proj: state.planning.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOptionSelected: (id,option) => dispatch(actions.select_option(id,option)),
        onProjectSelected: (event,id,option) => dispatch(actions.select_project(event,id,option)),
        onCategoryChanged: (event,id,option,type) => dispatch(actions.change_category(event,id,option,type)),
        openModal: (modalContent) => dispatch(actions.open_modal(modalContent)),
        closeModal: (modalContent) => dispatch(actions.close_modal(modalContent))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlannedContentItem);
