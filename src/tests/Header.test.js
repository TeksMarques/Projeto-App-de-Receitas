import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../pages/Meals';
import { act } from 'react-dom/test-utils';
import App from '../App';
// import Drinks from '../pages/Drinks';

test('Testa botao de perfil', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <Meals />
    </RecipesProvider>,
  );
  if (history.location.pathname === '/meals') {
    const profileLink = screen.getByTestId('profile-top-btn');
    expect(profileLink).toBeInTheDocument();
    userEvent.click(profileLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  }
});
test('Testa botão de pesquisa no /meals', async () => {
  const { history, debug } = renderWithRouter(
      <App />
  );
  console.log(history);
  act(() => {
    history.push('/meals');
  });
  debug();
  if (history.location.pathname === '/meals') {
    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByRole('button');
    const searchIcon = screen.getByRole('button', {
      name: /search/i,
    });
    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchLink);
    await screen.findByTestId('search-input');
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'receita');
    userEvent.click(searchLink);
    expect(searchInput).not.toBeInTheDocument();
  }
});
// test('Testa botão de pesquisa no /drinks', () => {
//   const { history } = renderWithRouter(
//     <RecipesProvider>
//       <Drinks />
//     </RecipesProvider>,
//   );
//   if (history.location.pathname === '/drinks') {
//     const profileLink = screen.getByTestId('profile-top-btn');
//     const searchLink = screen.getByRole('button');
//     const searchIcon = screen.getByTestId('search-top-btn');
//     expect(profileLink).toBeInTheDocument();
//     expect(searchLink).toBeInTheDocument();
//     expect(searchIcon).toBeInTheDocument();
//     expect(screen.getByTestId('search-input')).not.toBeInTheDocument();
//     userEvent.click(searchLink);
//     const searchInput = screen.getByTestId('search-input');
//     expect(searchInput).toBeInTheDocument();
//     userEvent.type(searchInput, 'receita');
//     userEvent.click(searchLink);
//     expect(searchInput).not.toBeInTheDocument();
//   }
// });
test('Titulo da pagina', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <Meals />
    </RecipesProvider>,
  );
  if (history.location.pathname === '/meals') {
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  }
});
