import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Table from '../components/Table';
import Provider from '../context/Provider';
import App from '../App';

test('renderiza a tabela corretamente', () => {
  render(<App />);
  
  waitFor(() => {
  expect(screen.getByText('StarWars')).toBeInTheDocument();
  expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });
});

test('aplica filtro corretamente', () => {
  render(<App />);
  
  fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
  fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
  fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000' } });
  fireEvent.click(screen.getByTestId('button-filter'));
  fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
});

