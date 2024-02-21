import { useEffect, useState } from 'react';
import Context from './Context';
import { PlanetType } from '../utils/types';

function Provider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState<PlanetType[]>(data);
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);
  const [comparisons, setComparisons] = useState('maior que');
  const [comparisonsValue, setComparisonsValue] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://swapi.dev/api/planets';
      const response = await fetch(url);
      const result = await response.json();
      const planets = result.results.map((planet: any) => {
        const { residents, ...notResidents } = planet;
        return notResidents;
      });
      console.log('Dados buscados', planets);
      setData(planets);
      setSearched(planets);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const planetSearched = () => {
      const newData = data.filter((planet) => planet.name
        .toLowerCase().includes(search.toLowerCase()));
      setSearched(newData);
    };
    planetSearched();
  }, [search, data]);

  const handleColumns = () => {
    if (columns.length !== 6) {
      setColumns(columns.filter((column) => column !== selectedColumn));
    }
    setSelectedColumn(columns[0]);
  };

  const handleComparisons = () => {
    console.log('handleComparisons chamado');

    const filteredColumns = searched.filter((planet: any) => {
      const value = Number(planet[selectedColumn]);
      const comparison = Number(comparisonsValue);

      if (comparisons === 'maior que') {
        return value > comparison;
      } if (comparisons === 'menor que') {
        return value < comparison;
      }
      return value === comparison;
    });
    console.log('filteredColumns', filteredColumns);
    setSearched(filteredColumns);
    handleColumns();
  };

  const handleOptions = (target: any) => {
    console.log(target);
    if (target.name === 'column') {
      setSelectedColumn(target.value);
    } else if (target.name === 'comparison') {
      setComparisons(target.value);
    } else {
      setComparisonsValue(target.value);
    }
  };

  const contextValue = {
    data,
    setData,
    search,
    setSearch,
    searched,
    setSearched,
    columns,
    setColumns,
    selectedColumn,
    setSelectedColumn,
    comparisons,
    setComparisons,
    comparisonsValue,
    setComparisonsValue,
    handleColumns,
    handleComparisons,
    handleOptions,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
