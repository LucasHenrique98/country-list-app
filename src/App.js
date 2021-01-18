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
      totalPopulation: 0,
      countriesLength: 0,
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

    const population = this.totalPopulationCount(allCountries);
    const countriesLength = allCountries.length;
    this.setState({
      allCountries: allCountries,
      filteredCountries: Object.assign([], allCountries),
      totalPopulation: population,
      countriesLength: countriesLength,
    });
  }

  totalPopulationCount = (countries) => {
    const population = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);

    return population;
  };

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(newText.toLowerCase());
    });

    const population = this.totalPopulationCount(filteredCountries);
    const countriesLength = filteredCountries.length;
    this.setState({
      filteredCountries: filteredCountries,
      totalPopulation: population,
      countriesLength: countriesLength,
    });
  };

  render() {
    const { filteredCountries, totalPopulation, filter } = this.state;

    return (
      <div>
        <h1>Country List</h1>
        <Header
          totalPopulation={totalPopulation}
          countriesCount={this.state.countriesLength}
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
        />
        <CountrieList countries={filteredCountries} />
      </div>
    );
  }
}
