import React, { useContext } from 'react';
import context from '../context/Context';

function Table() {
  const { data } = useContext(context);

  if (data.length === 0) {
    return <div>error</div>;
  }

  const keysData = Object.keys(data[0]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {keysData.map((key) => (
              <th key={ key }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet:any) => (
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
