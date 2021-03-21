
import * as actionTypes from './actionTypes';

export const select_option = (id,option) => {
    return {
        type: actionTypes.SELECT_OPTION,
        id: id,
        option: option
    }
};

export const select_project = (event,id,option) => {
    return {
        type: actionTypes.SELECT_PROJECT,
        target: event.target,
        id: id,
        option: option
    }
};

export const change_category = (event,id,option,cat) => {
    return {
        type: actionTypes.CHANGE_CATEGORY,
        target: event.target,
        id: id,
        option: option,
        cat: cat
    }
};


export const update_costs = () => {
    return {
        type: actionTypes.UPDATE_COSTS
    }
}

export const add_project = () => {
    return {
        type: actionTypes.ADD_PROJECT
    }
}
