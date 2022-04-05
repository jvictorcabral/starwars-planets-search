import React from 'react';
import './App.css';
import Table from './components/Table';
import Planetprovider from './context/PlanetProvider';

function App() {
  return (
    <Planetprovider>
      <span>Hello, world!</span>
      <Table />
    </Planetprovider>
  );
}

export default App;
