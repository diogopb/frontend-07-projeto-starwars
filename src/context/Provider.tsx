import { useEffect, useState } from 'react';
import Context from './Context';
import { PlanetType } from '../utils/types';

function Provider({ children }: { children: React.ReactNode }) {
  const [dataApi, setDataApi] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState<PlanetType[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://swapi.dev/api/planets';
      const response = await fetch(url);
      const result = await response.json();
      const planets = result.results.map((planet: any) => {
        const { residents, ...notResidents } = planet;
        return notResidents;
      });
      setDataApi(planets);
    };
    const planetSearched = () => {
      const newData = dataApi.filter((planet) => planet.name
        .includes(search.toLowerCase()));
      setSearched(newData);
    };
    fetchApi();
    planetSearched();
  }, [dataApi, search]);

  return (
    <Context.Provider value={ { data: dataApi, setSearch, searched } }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
