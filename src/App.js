import React, { Component } from 'react';
import CountrieList from './components/CountrieList';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filter: '',
      filteredCountries: [],
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        name,
        id: numericCode,
        flag,
        population,
        filterName: name.toLowerCase(),
      };
    });

    this.setState({
      allCountries: allCountries,
      filteredCountries: Object.assign([], allCountries),
    });
  }

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(newText.toLowerCase());
    });
    this.setState({
      filteredCountries: filteredCountries,
    });
    console.log(this.state.filteredCountries);
  };

  render() {
    const { filteredCountries, filter } = this.state;

    return (
      <div>
        <h1>Country List</h1>
        <Header filter={filter} onChangeFilter={this.handleChangeFilter} />
        <CountrieList countries={filteredCountries} />
      </div>
    );
  }
}
