import { Component, PropTypes } from 'react';

export default class List extends Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow() {
    const { data, renderRow } = this.props;
    if(!data) {
      return null;
    }
    const nodes = data.map((rowData, index) => {
      return (
          renderRow(rowData, index)
      );
    })
    return nodes;
  }

  render() {
    return (
      <ul>
        {this._renderRow()}
      </ul>
    )
  }
}
