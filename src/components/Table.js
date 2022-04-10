import React, { useContext, useState } from 'react';
import MyContext from '../context/PlanetsContext';
import OrderFilter from './OrderFilter';
// import OrderFilter from './OrderFilter';

// Consegui o requisito 2 com a ajuda do George Lucas;
// Consegui o requisito 7 com a ajuda do George Lucas tambem;

function Table() {
  const [inputName, setInputName] = useState([]);
  const [columnSelect, setColumnSelect] = useState('population');
  const [comparisonSelect, setComparisonSelect] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
  const [firstInput, setFirstInput] = useState('population');
  const [secondInput, setSecondInput] = useState('ASC');
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });

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

  OrderFilter(filter, order);

  const handleClick = () => {
    filterByNumberFunc({ columnSelect, comparisonSelect, inputValue });
    const dontRepeat = select.filter((element) => element !== columnSelect);
    selectFunc(dontRepeat);
    setColumnSelect(dontRepeat[0]);
  };

  const HandleDeleteFilter = (column) => {
    const removeFilter = filterByNumber.filter((data) => data.columnSelect !== column);
    setFilterByNumber(removeFilter);
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

      <div>
        <select
          data-testid="column-sort"
          onChange={ ({ target }) => setFirstInput(target.value) }
          value={ firstInput }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>

        <label htmlFor="ASC">
          <input
            type="radio"
            id="ASC"
            name="sort"
            onChange={ ({ target }) => setSecondInput(target.value) }
            data-testid="column-sort-input-asc"
            value="ASC"
            defaultChecked
          />
          <span>Ascendente</span>
        </label>

        <label htmlFor="DESC">
          <input
            id="DESC"
            type="radio"
            name="sort"
            onChange={ ({ target }) => setSecondInput(target.value) }
            data-testid="column-sort-input-desc"
            value="DESC"
          />
          <span>Descendente</span>
        </label>

        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => setOrder({ column: firstInput, sort: secondInput }) }
        >
          Ordenar
        </button>
      </div>

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
              onClick={ () => HandleDeleteFilter(element.columnSelect) }
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
              <td data-testid="planet-name">{ name }</td>
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
