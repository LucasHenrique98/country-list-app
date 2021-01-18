import React, { Component } from 'react';

export default class Header extends Component {
  handleChangeFilter = (event) => {
    const newText = event.target.value;

    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter } = this.props;
    return (
      <div>
        <input type="text" value={filter} onChange={this.handleChangeFilter} />{' '}
        |<span>Population: </span> |<span>Countries: </span>
      </div>
    );
  }
}
