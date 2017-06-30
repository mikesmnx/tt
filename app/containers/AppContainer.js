import React from 'react';
import PropTypes from 'prop-types';
import SortableTableContainer from '../containers/SortableTableContainer';
import DialogContainer from '../containers/DialogContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dataActions from '../actions';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as constants from '../constants';

class AppContainer extends React.Component {
    static propTypes = {
        people: PropTypes.array,
        actions: PropTypes.object,
        settings: PropTypes.object
    };

    componentDidMount() {
        if (!this.props.people.length) {
            this.props.actions.fetchPeople();
        }
    }

    render() {
        return (
            <div>
                <br/>
                <DialogContainer />
                <br/>
                <Tabs>
                    <Tab label="Простой список">
                        <SortableTableContainer data={this.props.settings.fullPlain} name="fullPlain" />
                    </Tab>
                    <Tab label="Разделение на группы">
                        <SortableTableContainer data={this.props.settings.partGroupIT} name="partGroupIT" />

                        <SortableTableContainer data={this.props.settings.partGroupHR} name="partGroupHR" />

                        <SortableTableContainer data={this.props.settings.partGroupAC} name="partGroupAC" />

                        <SortableTableContainer data={this.props.settings.partGroupAH} name="partGroupAH" />

                        <SortableTableContainer data={this.props.settings.partGroupSB} name="partGroupSB" />

                        <SortableTableContainer data={this.props.settings.partGroupTP} name="partGroupTP" />
                    </Tab>
                </Tabs>

                {!this.props.people.length ? 'загрузка...' : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const result = {};

    if (state.loadedData && state.loadedData.people && state.loadedData.people.length > 0) {
        result.people = state.loadedData.people;
    } else {
        result.people = [];
    }

    if (typeof state.tables.settings !== 'undefined') {
        result.settings = state.tables.settings;
    } else {
        result.settings = {
            fullPlain: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            },
            partGroupIT: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            },
            partGroupHR: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            },
            partGroupAH: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            },
            partGroupAC: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            },
            partGroupSB: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            },
            partGroupTP: {
                people: [], sortField: constants.DEFAULT_SORT_FIELD, sortAsc: constants.DEFAULT_SORT_ASC
            }
        };
    }

    return result;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(dataActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
