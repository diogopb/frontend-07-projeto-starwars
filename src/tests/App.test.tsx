import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Table from '../components/Table';
import Provider from '../context/Provider';
import App from '../App';
import { vi } from 'vitest';
import Context, {ContextType} from '../context/Context';
import userEvent from '@testing-library/user-event';

const mockData: ContextType = {
  data: [
    {
      name: 'Alderaan',
      rotation_period: '24',
      orbital_period: '364',
      diameter: '12500',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '40',
      population: '2000000000',
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-10T11:35:48.479000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.dev/api/planets/2/',
    },
    {
      name: 'Yavin IV',
      rotation_period: '24',
      orbital_period: '4818',
      diameter: '10200',
      climate: 'temperate, tropical',
      gravity: '1 standard',
      terrain: 'jungle, rainforests',
      surface_water: '8',
      population: '1000',
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-10T11:37:19.144000Z',
      edited: '2014-12-20T20:58:18.421000Z',
      url: 'https://swapi.dev/api/planets/3/',
    },
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.dev/api/planets/1/',
    }
  ],
  setData: vi.fn(),
  search: '',
  setSearch: vi.fn(),
  searched: [
    {
      name: 'Alderaan',
      rotation_period: '24',
      orbital_period: '364',
      diameter: '12500',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '40',
      population: '2000000000',
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-10T11:35:48.479000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.dev/api/planets/2/',
    },
    {
      name: 'Yavin IV',
      rotation_period: '24',
      orbital_period: '4818',
      diameter: '10200',
      climate: 'temperate, tropical',
      gravity: '1 standard',
      terrain: 'jungle, rainforests',
      surface_water: '8',
      population: '1000',
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-10T11:37:19.144000Z',
      edited: '2014-12-20T20:58:18.421000Z',
      url: 'https://swapi.dev/api/planets/3/',
    },
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.dev/api/planets/1/',
    }
  ],
  setSearched: vi.fn(),
  columns: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  setColumns: vi.fn(),
  selectedColumn: 'population',
  setSelectedColumn: vi.fn(),
  comparisons: 'maior que',
  setComparisons: vi.fn(),
  comparisonsValue: 1000,
  setComparisonsValue: vi.fn(),
  handleColumns: vi.fn(),
  handleComparisons: vi.fn(),
  filters: [],
  handleRemoveFilter: vi.fn(),
  handleRemoveAllFilters: vi.fn(),
};

test('renderiza a tabela corretamente', () => {
  render(
    <Context.Provider value={ mockData }>
      <Table />
    </Context.Provider>,
  );

  expect(screen.getByText('StarWars')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
  fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
  fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000' } });
  fireEvent.click(screen.getByTestId('button-filter'));
  fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
});

test('busca dados da API corretamente', async () => {
  render(
    <Context.Provider value={ mockData }>
      <Table />
    </Context.Provider>,
  );

  await waitFor(() => {
    expect(screen.getByText(/StarWars/i)).toBeInTheDocument();
  });
});

test('realiza a pesquisa corretamente', () => {
  render(
    <Context.Provider value={ mockData }>
      <Table />
    </Context.Provider>,
  );

  fireEvent.change(screen.getByTestId('name-filter'), { target: { value: 'Alderaan' } });

  expect(screen.getByText(/Alderaan/i)).toBeInTheDocument();
});

test('tabela atualiza corretamente', () => {
  render(
    <Provider>
      <Table />
    </Provider>,
  );
  
  waitFor(() => {
  userEvent.type(screen.getByPlaceholderText('Search by name...'), 'i');
  expect(screen.getByText('Alderaan')).not.toBeInTheDocument();
  expect(screen.getByText('Yavin IV')).toBeInTheDocument();
  expect(screen.getByText('Tatooine')).not.toBeInTheDocument();
})
  
});

test('limpa filtros corretamente', () => {
  render(
    <Context.Provider value={ mockData }>
      <Table />
    </Context.Provider>,
  );
  
  fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
  fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
  fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '10000' } });
  fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

  // expect(screen.getByText('Yavin IV')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Remover todas filtragens' }));

  expect(screen.getByText('Yavin IV')).toBeInTheDocument();
});
