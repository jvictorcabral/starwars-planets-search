import React, { useContext, useState } from 'react';
import MyContext from '../context/PlanetsContext';

// Consegui o requisito 2 com a ajuda do George Lucas;

function Table() {
  const [inputName, setInputName] = useState([]);
  const { xablau } = useContext(MyContext);

  const filter = xablau.filter((planet) => planet.name.includes(inputName));

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ inputName }
        onChange={ ({ target }) => setInputName(target.value) }
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          { filter.map(({ name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{ name }</td>
              <td>{ rotationPeriod }</td>
              <td>{ orbitalPeriod }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ surfaceWater }</td>
              <td>{ population }</td>
              <td>{ films }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ url }</td>

            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
