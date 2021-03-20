import React from 'react';

import Input from '../UI/Input/Input'


import classes from './PlannedContent.module.scss'

const plannedContent = (props) => {


    let input = null;
    let inputCategories = null;
    let examples = null;
    // if (props.loaded) {
    console.log(props)
    console.log(props.data)
    input = <div>
        <Input
            id={props.id}
            value={props.data.formValue}
            label={props.data.formElement.label}

            elementType={props.data.formElement.elementType}
            elementConfig={props.data.formElement.elementConfig}

            quickAdd={props.data.formElement.quickAdd}

            invalid={!props.data.formElement.valid}
            shouldValidate={props.data.formElement.validation}
            touched={props.data.formElement.touched}

            changed={(event) => props.inputHandler(event,props.id)}
            />
        </div>

    console.log(props.data.value)
    if (props.data.value!=='void') {
        const categories = Object.values(props.data.formOptions).map(opt => {
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

                changed={(event) => props.inputHandler(event,opt.label)}
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
    // }
    return (
        <div className={classes.PlannedContent}>
            {input}
            {inputCategories}
            {examples}
        </div>
    )
}

export default plannedContent
