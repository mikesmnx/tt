import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pplActions from '../actions';
import SortableTable from '../components/SortableTable';

class SortableTableContainer extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        name: PropTypes.string,
        actions: PropTypes.object,
        settings: PropTypes.object,
    };

    componentDidMount() {
        this.props.actions.initTable(this.props.name, this.props.data.people);
    }

    handleSort = (key) => {
        this.props.actions.sortTable(this.props.name, this.props.data.people, key, this.props.data.sortField, this.props.data.sortAsc);
    }

    render() {
        return (
            <SortableTable data={this.props.data.people} handleSort={this.handleSort} sortField={this.props.data.sortField} sortAsc={this.props.data.sortAsc} />
        );
    }
}

const mapStateToProps = (state) => {
    const result = {};
    if (typeof state.tables.settings !== 'undefined') {
        result.settings = state.tables.settings;
    }

    return result;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(pplActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortableTableContainer);
