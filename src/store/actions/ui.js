
import * as actionTypes from './actionTypes';


export const open_modal = () => {
    return {
        type: actionTypes.OPEN_MODAL
    }
};

export const close_modal = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    }
};
