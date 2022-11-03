import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';
// import meals from '../../cypress/mocks/meals';

describe('Testes da tela Footer - Menu inferior', () => {
  it('Procura elementos obrigatórios', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/done-recipes');
    });
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
});
