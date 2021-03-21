import React, {Component} from 'react';

import classes from './Modal.module.scss';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

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
                <Backdrop show={this.props.show} clicked={() => this.props.closeModal()} />
                {this.props.show ? modal : null}
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        show: state.ui.openModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(actions.open_modal()),
        closeModal: () => dispatch(actions.close_modal())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal);
