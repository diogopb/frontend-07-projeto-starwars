import { render, fireEvent } from '@testing-library/react';
import Provider from '../context/Provider';
import Table from '../components/Table';

describe('Testes do componente Provider', () => {
  test('verifica se o Provider renderiza corretamente', () => {
    const { container } = render(
      <Provider>
        <div>Teste</div>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});

describe('Testes do componente Table', () => {
  test('verifica se a tabela renderiza corretamente', () => {
    const { container } = render(
      <Provider>
        <Table />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});