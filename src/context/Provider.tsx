import { useEffect, useState } from 'react';
import Context from './Context';
import { PlanetType } from '../utils/types';

function Provider({ children }: { children: React.ReactNode }) {
  const [dataApi, setDataApi] = useState<PlanetType[]>([]);

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
    fetchApi();
  }, []);

  return (
    <Context.Provider value={ { data: dataApi } }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
