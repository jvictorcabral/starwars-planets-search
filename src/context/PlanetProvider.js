import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './PlanetsContext';
import PlanetsAPI from '../service/PlanetsAPI';

function Planetprovider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [select, setSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterByNumber, setFilterByNumber] = useState([
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
  ]);

  async function getApi() {
    const getPlanets = await PlanetsAPI();
    setPlanets(getPlanets);
  }

  const selectFunc = (e) => {
    setSelect(e);
  };

  const filterByNumberFunc = (e) => {
    setFilterByNumber((prevState) => [...prevState, e]);
  };

  const state = {
    planets,
    select,
    filterByNumber,
    selectFunc,
    filterByNumberFunc,
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <MyContext.Provider value={ state }>
      { children }
    </MyContext.Provider>
  );
}

Planetprovider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Planetprovider;
