import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const loadedData = (state = { people: [] }, action) => {
    switch (action.type) {
        case types.FETCH_PPL_SUCCESS:
            return {
                people: action.payload.people
            };
        case types.DATA_ADD_ITEM:
            state.people.push(action.payload);
            return {
                people: state.people
            };
        default:
            return state;
    }
};

const tables = (state = [], action) => {
    switch (action.type) {
        case types.TABLE_SORT_CHANGE:
        case types.TABLE_INIT:
            const settings = Object.assign({}, state.settings, action.payload);

            return {
                ...state,
                settings
            };
        case types.TABLE_ADD_ITEM:
            const tableSettings = Object.assign({}, state.settings);
            tableSettings[action.payload.name].people.push(action.payload.item);

            return {
                ...state,
                settings: tableSettings
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    loadedData,
    tables,
    routing
});

export default rootReducer;
