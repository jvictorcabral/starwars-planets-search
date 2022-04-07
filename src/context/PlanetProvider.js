import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './PlanetsContext';
import PlanetsAPI from '../service/PlanetsAPI';

function Planetprovider({ children }) {
  const [xablau, setXablau] = useState([]);

  async function getApi() {
    const getPlanets = await PlanetsAPI();
    setXablau(getPlanets);
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <MyContext.Provider value={ { xablau } }>
      { children }
    </MyContext.Provider>
  );
}

Planetprovider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Planetprovider;
