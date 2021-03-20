import React from 'react';

import Input from '../UI/Input/Input'

import checkbox from './Checkbox';


import classes from './PlannedContent.module.scss'

const plannedContent = (props) => {

    let input = null;
    let inputCategories = null;
    let examples = null;

    // const displays = Object.keys(props.data).map(key => {
    // if (!['opt1','opt2'].includes(key)) {
        //     return null;
        // }
    let key = 'opt1';
    let dat = props.data.opt1;
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

        changed={(event) => props.inputHandler(event,props.id,key)}
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

    let classAdd = [classes.PlannedContent]
    if (props.data.checked===key) {
        classAdd.push(classes.Checked)
    }
    const display1 =  <div
            key={key}
            className={classAdd.join(' ')}
            onClick={(event) => props.chooseOptionHandler(event,props.key1,key)}>
            {input}
            {inputCategories}
            {examples}
        </div>
        // })

    const key2 = 'opt2';
    dat = props.data.opt2;
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

        changed={(event) => props.inputHandler(event,props.id,key2)}
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

    classAdd = [classes.PlannedContent]
    if (props.data.checked===key2) {
        classAdd.push(classes.Checked)
    }
    const display2 = <div
            key={key2}
            className={classAdd.join(' ')}
            onClick={(event) => props.chooseOptionHandler(event,props.key1,key2)}>
            {input}
            {inputCategories}
            {examples}
        </div>
        // })

    // console.log(displays)
    // displays.insert(0,)
    return <div className={classes.OptionsContainer}>
        {display1}
        <div className={classes.Changer}>
            <i className="fas fa-caret-circle-right"></i>
        </div>
        {display2}
    </div>
}

export default plannedContent

//
//     <Input
//         value={checkbox.value}
//         label={checkbox.label}
//
//         elementType='checkbox'
//         elementConfig={checkbox.elementConfig}
//
//         invalid={!checkbox.valid}
//         shouldValidate={checkbox.validation}
//         touched={checkbox.touched}
//
//         changed={(event) => props.inputHandler(event,checkbox.label)}
//         />
