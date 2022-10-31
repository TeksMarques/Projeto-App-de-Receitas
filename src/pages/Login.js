import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RecipesContext from '../context/RecipesContext';
import logo from '../img/T_DoceLogo.png';

export default function Login() {
  const { email, password, useEmail, usePassword,
    submitDisabled, submitInfo } = useContext(RecipesContext);
  return (
    <Form onSubmit={ submitInfo }>
      <img className="imglogo" src={ logo } alt="Logo" />
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          value={ email }
          onChange={ useEmail }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          name="password"
          type="password"
          value={ password }
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ usePassword }
        />
      </Form.Group>
      <Button
        className="entrar-button"
        variant="success"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ submitDisabled }
      >
        Entrar
      </Button>
    </Form>
    // <form onSubmit={ submitInfo }>
    //   <label htmlFor="email">
    //     <input
    //       id="email"
    //       name="email"
    //       type="email"
    //       placeholder="Digite seu e-mail"
    //       data-testid="email-input"
    //       value={ email }
    //       onChange={ useEmail }
    //     />
    //   </label>
    //   <label htmlFor="password">
    //     <input
    //       id="password"
    //       name="password"
    //       type="password"
    //       value={ password }
    //       placeholder="Digite sua senha"
    //       data-testid="password-input"
    //       onChange={ usePassword }
    //     />
    //   </label>
    //   <button
    //     type="submit"
    //     data-testid="login-submit-btn"
    //     disabled={ submitDisabled }
    //   >
    //     Entrar
    //   </button>
    // </form>
  );
}
