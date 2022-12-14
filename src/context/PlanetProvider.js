import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './PlanetsContext';
import PlanetsAPI from '../service/PlanetsAPI';

function Planetprovider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [select, setSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterByNumber, setFilterByNumber] = useState([]);
  const NEGATIVE = -1;

  async function getApi() {
    const getPlanets = await PlanetsAPI();
    getPlanets.sort((a, b) => {
      if (a.name < b.name) return NEGATIVE;
      return 0;
    });
    setPlanets(getPlanets);
  }

  const selectFunc = (e) => {
    setSelect(e);
  };

  const orderPlanets = (e) => {
    setPlanets(e);
  };

  const filterByNumberFunc = (e) => {
    setFilterByNumber((prevState) => [...prevState, e]);
  };

  const state = {
    planets,
    select,
    filterByNumber,
    setFilterByNumber,
    selectFunc,
    filterByNumberFunc,
    orderPlanets,
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
