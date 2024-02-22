import { useEffect, useState } from 'react';
import Context from './Context';
import { PlanetType } from '../utils/types';

function Provider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any[]>([]);
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
  const [filters, setFilters] = useState<any[]>([]);

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
    const newFilter = {
      selectedColumn,
      comparisons,
      comparisonsValue,
    };
    setFilters([...filters, newFilter]);
  };

  const handleRemoveFilter = (filter: any) => {
    const newFilters = filters.filter((item) => item.selectedColumn !== filter);
    setFilters(newFilters);
    setColumns([...columns, filter]);

    const remainingColumns = newFilters.map((e: any) => e.selectedColumn);
    setColumns([...columns, ...remainingColumns]);

    if (newFilters.length === 0) {
      setSearched(data);
    }

    let newData = [...data];
    newFilters.forEach((item) => {
      newData = newData.filter((planet) => {
        const value = Number(planet[item.selectedColumn]);
        const comparison = Number(item.comparisonsValue);

        if (item.comparisons === 'maior que') {
          return value > comparison;
        } if (item.comparisons === 'menor que') {
          return value < comparison;
        }
        return value === comparison;
      });
    });

    setSearched(newData);
  };

  const handleRemoveAllFilters = () => {
    setFilters([]);
    setColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setSearched(data);
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
    filters,
    handleRemoveFilter,
    handleRemoveAllFilters,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
