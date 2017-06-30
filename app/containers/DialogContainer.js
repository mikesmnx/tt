import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DialogContainer extends React.Component {
    static propTypes = {
        actions: PropTypes.object
    };

    state = {
        open: false,
        name: '',
        surname: '',
        group: ''
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        const groups = {
            'IT': 'partGroupIT',
            'Отдел кадров': 'partGroupHR',
            'Бухгалтерия': 'partGroupAC',
            'АХД': 'partGroupAH',
            'Служба безопасности': 'partGroupSB',
            'Руководство': 'partGroupTP'
        };

        this.props.actions.addItem(this.state.name, this.state.surname, this.state.group);
        this.props.actions.addItemToTable('fullPlain', { name: this.state.name, surname: this.state.surname, group: this.state.group });
        this.props.actions.addItemToTable(groups[this.state.group], { name: this.state.name, surname: this.state.surname, group: this.state.group });
        this.setState({open: false});
    };

    render() {
        const acts = [
            <FlatButton label="Отмена" onClick={this.handleClose} />,
            <FlatButton label="Сохранить" onClick={this.handleSubmit} disabled={!this.state.name || !this.state.surname || !this.state.group} />,
        ];

        return (
            <div>
                <RaisedButton label="Добавить" onClick={this.handleOpen} />
                <Dialog title="Добавление записи" actions={acts} modal={true} open={this.state.open}>
                    <TextField hintText="Имя" floatingLabelText="Введите имя пользователя" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <TextField hintText="Фамилия" floatingLabelText="Введите фамилию пользователя" value={this.state.surname} onChange={e => this.setState({ surname: e.target.value })} />
                    <SelectField floatingLabelText="Группа" value={this.state.group} onChange={(e, i, value) => this.setState({ group: value })}>
                        <MenuItem value="IT" primaryText="IT" />
                        <MenuItem value="АХД" primaryText="АХД" />
                        <MenuItem value="Руководство" primaryText="Руководство" />
                        <MenuItem value="Служба безопасности" primaryText="Служба безопасности" />
                        <MenuItem value="Бухгалтерия" primaryText="Бухгалтерия" />
                        <MenuItem value="Отдел кадров" primaryText="Отдел кадров" />
                    </SelectField>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const result = {};

    console.log(state);

    return result;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DialogContainer);
