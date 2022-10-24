import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Testes tela de Login', () => {
  it('Verifica se redenriza', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });
  it('Verifica insere valores no campo', () => {
    renderWithRouter(<App />);
    const botao = screen.getByTestId('login-submit-btn');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    expect(botao).toBeDisabled();

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');

    expect(botao).toBeEnabled();

    userEvent.click(botao);
  });
});
