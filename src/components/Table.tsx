import React, { useContext } from 'react';
import context from '../context/Context';

function Table() {
  const {
    data,
    setSearch,
    searched,
    columns,
    selectedColumn,
    comparisons,
    comparisonsValue,
    handleComparisons,
    handleOptions } = useContext(context);
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
      <div>
        <label htmlFor="column">Coluna</label>
        <select
          name="column"
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ ({ target }) => handleOptions(target) }
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
          onChange={ (e) => handleOptions(e) }
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
          onChange={ (e) => handleOptions(e) }
        />

        <button
          data-testid="button-filter"
          onClick={ handleComparisons }
        >
          Filter
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
