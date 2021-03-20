import React, { Component } from 'react';

import Input from '../UI/Input/Input'
import plannedContentForm from './PlannedContentForm';
import categoriesForm from './CategoriesForm';

import classes from './PlannedContent.module.scss'

class plannedContent extends Component {

    state = {
        formElement: null,
        formOptions: null,
        selected: false
    }

    componentDidMount() {
        this.setState({
            formElement: plannedContentForm,
            formOptions: categoriesForm,
            loaded: true
        })
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedFormElement = {...this.state.formElement};
        updatedFormElement.value = event.target.value;

        let costs = null;
        switch (updatedFormElement.value) {
            case 'street':
                costs = 16;
            case 'build':
                costs = 20;
            case 'industry':
                costs = 32;
            case 'parc':
                costs = 12
        }
        updatedFormElement.costs = costs;

        this.setState({formElement: updatedFormElement, selected: (updatedFormElement.value==='void') ? false : true})
    }

    render() {

        let input = null;
        let inputCategories = null;
        let examples = null;
        if (this.state.loaded) {
            input = <div>
                <Input
                    id={this.props.id}
                    value={this.state.formValue}
                    label={this.state.formElement.label}

                    elementType={this.state.formElement.elementType}
                    elementConfig={this.state.formElement.elementConfig}

                    quickAdd={this.state.formElement.quickAdd}

                    invalid={!this.state.formElement.valid}
                    shouldValidate={this.state.formElement.validation}
                    touched={this.state.formElement.touched}

                    changed={(event) => this.inputChangedHandler(event,this.props.id)}
                    />
                </div>

            if (this.state.selected) {
                const categories = Object.values(this.state.formOptions).map(opt => {
                    return <Input
                        key={opt.label}
                        id={opt.label}
                        value={opt.value}
                        label={opt.label}

                        elementType={opt.elementType}
                        elementConfig={opt.elementConfig}

                        quickAdd={opt.quickAdd}

                        invalid={!opt.valid}
                        shouldValidate={opt.validation}
                        touched={opt.touched}

                        changed={(event) => this.inputChangedHandler(event,1)}
                        />
                })

                inputCategories = <div
                      className={classes.SelectCategories}>
                      {categories}
                </div>

                examples = <div
                      className={classes.ExampleItems}>
                        <img
                            src='/assets/images/kita1.jpeg'
                            className={classes.ExampleItem} alt='example' />
                        <img
                            src='/assets/images/kita2.jpeg'
                            className={classes.ExampleItem} alt='example' />
                        <img
                            src='/assets/images/kita3.jpeg'
                            className={classes.ExampleItem} alt='example' />
                </div>
            }
        }
        return (
            <div>
                {input}
                {inputCategories}
                {examples}
            </div>
        )
    }
}

export default plannedContent
