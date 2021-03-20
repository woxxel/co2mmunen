import React, {Component} from 'react';

import classes from './Modal.module.scss';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show ||  nextProps.children !== this.props.children;
    }

    render() {
        const modal = (
            <div
                className={classes.Modal}>
                {this.props.children}
            </div>
        )
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalCancelled} />
                {this.props.show ? modal : null}
            </Aux>
        )
    }
};

export default Modal;
