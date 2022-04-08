import React, { useContext, useState } from 'react';
import MyContext from '../context/PlanetsContext';

// Consegui o requisito 2 com a ajuda do George Lucas;

function Table() {
  const [inputName, setInputName] = useState([]);
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparisonSelect, setComparisonSelect] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);

  const { planets,
    select,
    filterByNumber,
    setFilterByNumber,
    selectFunc,
    filterByNumberFunc,
  } = useContext(MyContext);

  let filter = planets.filter((planet) => planet.name.includes(inputName));
  if (filterByNumber) {
    filterByNumber.forEach((element) => {
      if (element.comparisonSelect === 'maior que') {
        filter = filter
          .filter((e) => Number(e[element.columnSelect]) > Number(element.inputValue));
        // return filter;
      } else if (element.comparisonSelect === 'menor que') {
        filter = filter
          .filter((e) => Number(e[element.columnSelect]) < Number(element.inputValue));
        // return filter;
      } else {
        filter = filter
          .filter((e) => e[element.columnSelect] === element.inputValue);
      // return filter;
      }
    });
  }

  const handleClick = () => {
    filterByNumberFunc({ columnSelect, comparisonSelect, inputValue });
    const dontRepeat = select.filter((element) => element !== columnSelect);
    selectFunc(dontRepeat);
    setColumnSelect(dontRepeat[0]);
  };

  const removeFilter = (column) => {
    const remove = filterByNumber.filter((data) => data.columnSelect !== column);
    setFilterByNumber(remove);
  };

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        value={ inputName }
        onChange={ ({ target }) => setInputName(target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumnSelect(target.value) }
        value={ columnSelect }
      >
        { select.map((element) => (
          <option key={ element }>
            { element }
          </option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparisonSelect(target.value) }
        value={ comparisonSelect }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        name="input-button"
        onClick={ handleClick }
      >
        filtrar
      </button>

      {filterByNumber.length !== 0
        && (filterByNumber.map((element, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {element.columnSelect}
              {' '}
              {element.comparisonSelect}
              {' '}
              {element.inputValue}
            </span>

            <button
              name={ element.columnSelect }
              type="button"
              onClick={ () => removeFilter(element.columnSelect) }
            >
              X
            </button>
          </div>
        )))}

      {filterByNumber.length !== 0
      && (
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setFilterByNumber([]) }
        >
          Remover Filtros
        </button>
      )}

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
