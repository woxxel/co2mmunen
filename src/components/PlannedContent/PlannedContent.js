import React from 'react';

import Input from '../UI/Input/Input'

import checkbox from './Checkbox';


import classes from './PlannedContent.module.scss'

const plannedContent = (props) => {

    let input = null;
    let inputCategories = null;
    let examples = null;
    // if (props.loaded) {

    const displays = Object.keys(props.data).map(key => {

        const dat = props.data[key];
        input = <div>
        <Input
            id={dat.id}
            value={dat.formValue}
            label={dat.formElement.label}

            elementType={dat.formElement.elementType}
            elementConfig={dat.formElement.elementConfig}

            invalid={!dat.formElement.valid}
            shouldValidate={dat.formElement.validation}
            touched={dat.formElement.touched}

            changed={(event) => props.inputHandler(event,props.id)}
            />
        </div>

        if (dat.value!=='void') {
            const categories = Object.values(dat.formOptions).map(opt => {
                return <Input
                key={opt.label}
                id={opt.label}
                value={opt.value}
                label={opt.label}

                elementType={opt.elementType}
                elementConfig={opt.elementConfig}

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

        return (
            <div
                key={key}
                className={classes.PlannedContent}>
                <Input
                    value={checkbox.value}
                    label={checkbox.label}

                    elementType='checkbox'
                    elementConfig={checkbox.elementConfig}

                    invalid={!checkbox.valid}
                    shouldValidate={checkbox.validation}
                    touched={checkbox.touched}

                    changed={(event) => props.inputHandler(event,checkbox.label)}
                    />
                {input}
                {inputCategories}
                {examples}
            </div>
            )
        })

    return <div className={classes.OptionsContainer}>
        {displays}
    </div>
}

export default plannedContent
