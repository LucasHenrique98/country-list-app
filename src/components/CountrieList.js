import React, { Component } from 'react';
import Country from './Country';

export default class CountrieList extends Component {
  render() {
    const { countries } = this.props;
    return <Country countries={countries} />;
  }
}
