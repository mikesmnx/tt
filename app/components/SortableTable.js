import PropTypes from 'prop-types';
import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const headerBold = {
    fontWeight: 'bold'
};

const headerNormal = {
    fontWeight: 'normal'
};

class SortableTable extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        sortField: PropTypes.string,
        sortAsc: PropTypes.bool,
        handleSort: PropTypes.func
    };

    setSort = (key) => {
        this.props.handleSort(key);
    }

    render() {
        const rows = this.props.data.reduce((tableRows, item, i) => {
            tableRows[i] = (
                <TableRow key={i}>
                    <TableRowColumn>
                        {item.name}
                    </TableRowColumn>
                    <TableRowColumn>
                        {item.surname}
                    </TableRowColumn>
                    <TableRowColumn>
                        {item.group}
                    </TableRowColumn>
                </TableRow>
            );

            return tableRows;
        }, Array(this.props.data.length));

        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>
                            <div className="sortable-header" style={this.props.sortField === 'name' ? headerBold : headerNormal} onClick={() => this.setSort('name')}>Имя</div>
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <div className="sortable-header" style={this.props.sortField === 'surname' ? headerBold : headerNormal} onClick={() => this.setSort('surname')}>Фамилия</div>
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <div className="sortable-header" style={this.props.sortField === 'group' ? headerBold : headerNormal} onClick={() => this.setSort('group')}>Группа</div>
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
        );
    }
}

export default SortableTable;
