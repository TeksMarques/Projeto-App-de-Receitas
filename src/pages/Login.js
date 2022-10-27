import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function Login() {
  const { email, password, useEmail, usePassword,
    submitDisabled, submitInfo } = useContext(RecipesContext);
  return (
    <form onSubmit={ submitInfo }>
      <label htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          value={ email }
          onChange={ useEmail }
        />
      </label>
      <label htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          value={ password }
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ usePassword }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ submitDisabled }
      >
        Entrar
      </button>
    </form>
  );
}
