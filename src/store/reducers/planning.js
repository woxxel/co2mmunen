import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

import plannedContentForm from '../../components/PlannedContent/PlannedContentForm';
import categoriesForm from '../../components/PlannedContent/CategoriesForm';


import {building, traffic} from '../../components/PlannedContent/PlannedContentItem/ProjectTypes';
import * as categories from '../../components/PlannedContent/PlannedContentItem/Categories';
// import categoryForm from '../../components/PlannedContent/CategoriesForm';

const initialState = {
    // Feuerwehr, Bauernhöfe, Abfallentsorgung, Energieversorgung, Supermarkt, Kirchen, Sportplaetze
    //
    // Bildungsstaette:
    // Kita, Volkshochschulen, Schule
    //
    // Nutzgebaude:
    // Verwaltung,
    //
    // - Mehrzweckhallen / Sporthallen,
    //
    // - Gesundheitsbau
    // --- Krankenhäuser, Altenheim,
    //
    //
    // - Wohnungsbau
    //
    // Renovierung
    //
    // Unterkategorien:
    // Stockwerke, Grundflaeche
    //
    // // Material: Holz, Beton, Recyclingbeton, Hybrid
    // Bauvorhaben, landwirtschaft,


    projects: {
        id1: {
            opt1: {
                costs: 8,
                label: 'Verkehr',
                formProject: null,
                formOptions: null,
                selected: false,
            },
            opt2: {
                costs: 8,
                label: 'Verkehr',
                formProject: null,
                formOptions: null,
                selected: false,
            },
            costType: 'running',
            checked: 'opt1',
            arc: 6,
            arc_pos: null,
        },
        id2: {
            opt1: {
                costs: 20,
                label: 'Industrie',
                formProject: null,
                formOptions: null,
                selected: false,
            },
            opt2: {
                costs: 10,
                label: 'Industrie',
                formProject: null,
                formOptions: null,
                selected: false,
            },
            costType: 'running',
            checked: 'opt1',
            arc: 5,
            arc_pos: null,
        },
        id3: {
            opt1: {
                costs: 2,
                label: 'Ernährung',
                formProject: null,
                formOptions: null,
                selected: false,
            },
            opt2: {
                costs: 2,
                label: 'Ernährung',
                formProject: null,
                formOptions: null,
                selected: false,
            },
            costType: 'running',
            checked: 'opt1',
            arc: 4,
            arc_pos: null,
        },
    },
    currentBudget: null,
    totalBudget: 100,
    hoverID: null,
    clickedID: null,
    loaded: false,
    openModal: false
}


export const selectProject = (state, action) => {

    const updatedForm = updateObject(state.projects[action.id][action.option].formProject, {value: action.target.value});

    const updatedOption = updateObject(state.projects[action.id][action.option],{
        formProject: updatedForm,
        costs: null
    })

    const updatedProject = updateObject(state.projects[action.id],{
        [action.option]: updatedOption,
        arc: null
    })

    const updatedProjects = updateObject(state.projects,{[action.id]: updatedProject})

    return updateObject(state,{'projects': updatedProjects});
};

export const selectOption = (state, action) => {

    const updatedProject = updateObject(state.projects[action.id], {'checked':action.option})
    const updatedProjects = updateObject(state.projects, {[action.id]: updatedProject})
    return updateObject(state,{projects: updatedProjects});
}

export const changeCategory = (state, action) => {
    const updatedCategory = updateObject(state.projects[action.id][action.option].formOptions[action.cat],{value: action.target.value})
    const updatedCategories = updateObject(state.projects[action.id][action.option].formOptions,{[action.cat]:updatedCategory})
    const updatedOption = updateObject(state.projects[action.id][action.option],{formOptions:updatedCategories})
    const updatedProject = updateObject(state.projects[action.id],{[action.option]:updatedOption})
    const updatedProjects = updateObject(state.projects,{[action.id]:updatedProject})
    return updateObject(state,{projects:updatedProjects})
    // console.log(updatedCategory)

    // const updatedProject = updateObject(state.projects[action.id], {'checked':action.option})
    // const updatedProjects = updateObject(state.projects, {[action.id]: updatedProject})
    // return updateObject(state,{projects: updatedProjects});
}

export const updateCosts = (state, action) => {

    const updatedProjects = {...state.projects}
    let cumsum = 0;
    for (let id of Object.keys(updatedProjects)) {

        let option = updatedProjects[id].checked

        updatedProjects[id] = {...state.projects[id]}
        updatedProjects[id][option] = {...state.projects[id][option]}

        let costs = 0;

        if (updatedProjects[id].costType==='planned') {
            const project = state.projects[id][option].formProject.value
            if (project==='void') {
                continue
            }
            costs += building.options[project].costs;

            Object.keys(state.projects[id][option].formOptions).map(key => {
                const choice = state.projects[id][option].formOptions[key].value
                switch (categories[key].type) {
                    case 'unique':
                        costs += categories[key].options[choice].costs
                        break;
                    case 'linear':
                        costs += state.projects[id][option].formOptions[key].value * categories[key].costs
                        break;
                    default:
                        costs = 0;
                }
            })
        } else {
            costs = updatedProjects[id][option].costs
        }

        updatedProjects[id][option].costs = costs

        const arc = costs/state.totalBudget * 360.;
        updatedProjects[id].arc = arc;
        updatedProjects[id].arc_pos = cumsum/state.totalBudget * 360.;
        cumsum += costs
    }

    return updateObject(state,{
        projects: updatedProjects,
        currentBudget: cumsum
    });
}

export const addProject = (state, action) => {

    const id = Math.floor(Math.random()*10000);

    const projectType = 'building'
    const newForm = plannedContentForm;
    let formEntries = null;
    switch (projectType) {
        case 'building':
            formEntries = building;
            break;
        case 'traffic':
            formEntries = traffic;
            break;
        default:
            formEntries = null;
    }
    // const name = formEntries.name;
    const categories = formEntries.categories;

    newForm.elementConfig.options = [];
    Object.keys(formEntries.options).map(key => {
        newForm.elementConfig.options.push({
            value: key,
            displayValue: formEntries.options[key].name
        })
    })

    let catForms = {};
    Object.keys(categories).map(cat => {
        catForms[cat] = {...categoriesForm};
        catForms[cat].elementConfig = {options: []};
        catForms[cat].label = categories[cat].name;
        catForms[cat].key = cat;
        switch (categories[cat].type) {
            case 'unique':
                catForms[cat].elementType='select'
                Object.keys(categories[cat].options).map(key => {
                    catForms[cat].elementConfig.options.push({
                        value: key,
                        displayValue: categories[cat].options[key].name
                    })
                })
                break;
            case 'linear':
                catForms[cat].elementType='input'
                catForms[cat].value=categories[cat].default
                break;
            default:
                break;
        }
    })

    const newProject = {
        opt1: {
            costs: null,
            label: 'neues Projekt',
            formProject: newForm,
            formOptions: catForms,
        },
        opt2: {
            costs: null,
            label: 'neues Projekt',
            formProject: newForm,
            formOptions: catForms,
        },
        costType: 'planned',
        checked: 'opt1',
        arc: null,
        arc_pos: null,
    }
    const updatedProjects = updateObject(state.projects, {['id'+id]: newProject})

    return updateObject(state,{projects: updatedProjects})
    // this.setState({projects:updatedComponents},this.updateArcs())
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_PROJECT:
            state = selectProject(state, action);
            break;
        case actionTypes.SELECT_OPTION:
            state = selectOption(state, action);
            break;
        case actionTypes.CHANGE_CATEGORY:
            state = changeCategory(state, action);
            break;
        case actionTypes.UPDATE_COSTS: return updateCosts(state, action);
        case actionTypes.ADD_PROJECT: return addProject(state, action);
        default:
            return state;
    }
    return updateCosts(state, action);
};

export default reducer;
