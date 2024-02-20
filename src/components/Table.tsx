import React, { useContext } from 'react';
import context from '../context/Context';

function Table() {
  const { data, setSearch, searched } = useContext(context);

  if (data.length === 0) {
    return <div>error</div>;
  }

  const keysData = Object.keys(data[0]);

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div>
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
