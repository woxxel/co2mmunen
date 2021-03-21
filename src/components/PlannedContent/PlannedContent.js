import React from 'react';

import PlannedContentItem from './PlannedContentItem/PlannedContentItem.js';

// import checkbox from './Checkbox';


import classes from './PlannedContent.module.scss'

const plannedContent = (props) => {
    const display1 = <PlannedContentItem
        id={props.id}
        option={'opt1'}
        // data={props.data['opt1']}
        chooseOptionHandler={props.chooseOptionHandler} />
    const display2 = <PlannedContentItem
        id={props.id}
        option={'opt2'}
        // data={props.data['opt2']}
        chooseOptionHandler={props.chooseOptionHandler} />

    return <div className={classes.OptionsContainer}>
        {display1}
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
