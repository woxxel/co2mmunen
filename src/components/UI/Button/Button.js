import React from 'react';

import classes from './Button.module.scss';

const button = (props) => {

    let classesAdd = null;
    let icon = null;
    switch (props.type) {
        case 'add':
            classesAdd = "btn btn-add";
            icon = <i className="fas fa-plus" ></i>;
            break;
        case 'edit':
            classesAdd = "btn btn-edit";
            icon = <i className="fas fa-edit" ></i>;
            break;
        case 'delete':
            classesAdd = "btn btn-delete";
            icon = <i className="fas fa-minus" ></i>;
            break;
        case 'save':
            classesAdd = "btn btn-save";
            icon = <i className="fas fa-save"></i>;
            break;
        default:
            break;
    }
    return (
        <button className={[classes.Button, classesAdd].join(' ')} onClick={props.clicked}>{icon}{props.children}</button>
    )
};

export default button;
