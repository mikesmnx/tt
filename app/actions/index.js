import * as types from './types';
import * as constants from '../constants';

export function initTable(name, data) {
    const sortedData = {};
    sortedData[name] = {
        sortField: constants.DEFAULT_SORT_FIELD,
        sortAsc: constants.DEFAULT_SORT_ASC,
        people: data
    };

    return {
        type: types.TABLE_INIT,
        payload: sortedData
    };
}

export function addItem(name, surname, group) {
    return {
        type: types.DATA_ADD_ITEM,
        payload: {
            name,
            surname,
            group
        }
    };
}

export function addItemToTable(name, item) {
    return {
        type: types.TABLE_ADD_ITEM,
        payload: {
            name,
            item
        }
    };
}

export function sortTable(name, data, field, oldField, sortAsc) {
    let sortField = constants.DEFAULT_SORT_FIELD;
    if (typeof field !== undefined && field) {
        sortField = field;
    }

    let newSortAsc = constants.DEFAULT_SORT_ASC;
    if (typeof sortAsc !== undefined && sortAsc) {
        newSortAsc = !sortAsc;
    }

    if (field !== oldField) {
        newSortAsc = constants.DEFAULT_SORT_ASC;
    }

    data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
            return newSortAsc ? 1 : -1;
        }

        return newSortAsc ? -1 : 1;
    });

    const sortedData = {};
    sortedData[name] = {
        sortField: sortField,
        sortAsc: newSortAsc,
        people: data
    };

    return {
        type: types.TABLE_SORT_CHANGE,
        payload: sortedData
    };
}

function fetchPeopleSuccess(people) {
    return {
        type: types.FETCH_PPL_SUCCESS,
        payload: {
            people: people
        }
    };
}

function initTablesData(dispatch, people) {
    dispatch(sortTable('fullPlain', people.slice(0)));

    dispatch(sortTable('partGroupIT', people.filter(item => {
        return item.group === 'IT';
    })));

    dispatch(sortTable('partGroupHR', people.filter(item => {
        return item.group === 'Отдел кадров';
    })));

    dispatch(sortTable('partGroupAC', people.filter(item => {
        return item.group === 'Бухгалтерия';
    })));

    dispatch(sortTable('partGroupSB', people.filter(item => {
        return item.group === 'Служба безопасности';
    })));

    dispatch(sortTable('partGroupAH', people.filter(item => {
        return item.group === 'АХД';
    })));

    dispatch(sortTable('partGroupTP', people.filter(item => {
        return item.group === 'Руководство';
    })));
}

export function fetchPeople() {
    return (dispatch) => {
        return fetch('/data.json').then(response => {
            return response.json();
        }).then(people => {
            dispatch(fetchPeopleSuccess(people));

            initTablesData(dispatch, people);
        });
    };
}
