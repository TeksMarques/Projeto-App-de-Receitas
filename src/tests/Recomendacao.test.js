// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import { renderWithRouter } from './renderWith';
// import App from '../App';
// import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';
// // import fetch from '../../cypress/mocks/fetch';

// describe('Testes Recomendações', () => {
//   beforeEach(() => {
//     global.fetch = jest.fn(drinks);
//   });

//   test('Testa se aparecem 6 recomedações de meals no Recipe Details', () => {
//     // jest.spyOn(global, 'fetch').mockImplementation(() => ({ json: () => fetch }));
//     const { history } = renderWithRouter(
//       <App />,
//     );
//     act(() => {
//       history.push('/drinks');
//     });
//     expect(fetch).toHaveBeenCalled();
//     expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
//     expect(screen.findByTestId('0-recommendation-card')).toBeInTheDocument();
//   });
// });
