import React, { useContext } from 'react';
import context from '../context/Context';

function Table() {
  const {
    data,
    setSearch,
    searched,
    columns,
    selectedColumn,
    setSelectedColumn,
    comparisons,
    setComparisons,
    comparisonsValue,
    setComparisonsValue,
    handleComparisons,
    filters,
    handleRemoveFilter,
    handleRemoveAllFilters,
  } = useContext(context);
  const options = ['maior que', 'menor que', 'igual a'];

  if (data.length === 0) {
    return <div>error</div>;
  }

  const keysData = Object.keys(data[0]);

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>StarWars</h1>
      <div>
        <label htmlFor="column">Coluna</label>
        <select
          name="column"
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ (e) => setSelectedColumn(e.target.value) }
        >
          {columns.map((column: any) => (
            <option key={ column }>{column}</option>
          ))}
        </select>

        <label htmlFor="comparison">Operator</label>
        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ comparisons }
          onChange={ (e) => setComparisons(e.target.value) }
        >
          {options.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>

        <input
          type="number"
          name="value"
          data-testid="value-filter"
          value={ comparisonsValue }
          onChange={ (e) => setComparisonsValue(e.target.value) }
        />

        <button
          data-testid="button-filter"
          onClick={ handleComparisons }
        >
          Filter
        </button>

        {filters.map((filter: any) => (
          <div data-testid="filter" key={ filter.selectedColumn }>
            <p>{filter.selectedColumn}</p>
            <p>{filter.comparisons}</p>
            <p>{filter.comparisonsValue}</p>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter.selectedColumn) }
            >
              X
            </button>
          </div>
        ))}

        <button
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
        >
          Remover todas filtragens
        </button>

      </div>

      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            {keysData.map((key) => (
              <th key={ key }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searched.map((planet:any) => (
            <tr key={ planet.name }>
              {keysData.map((key) => (
                <td key={ key }>{planet[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
