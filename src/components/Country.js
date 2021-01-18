import React, { Component } from 'react';

export default class Country extends Component {
  render() {
    const { countries } = this.props;
    return (
      <div>
        <ul>
          {countries.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
