import React from 'react';
import {
  render, screen, cleanup, waitFor
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NavBar from './NavBar';

afterEach(cleanup);

fetchMock.enableMocks();

const categories = [
  'Baseball', 'Basketball', 'Boxing', 'Football',
  'Golf', 'Hockey', 'Running', 'Skateboarding', 'Soccer',
  'Weightlifting'
];

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        {component}
      </Router>
    )
  };
};

it('renders without crashing', () => {
  renderWithRouter(
    <NavBar />
  );
  expect(screen.getByRole('button', { name: /Login/i }));
});

it('header component matches snapshot', () => {
  const { asFragment } = renderWithRouter(
    <NavBar />
  );

  expect(asFragment()).toMatchSnapshot();
});

it('has the correct URL', () => {
  global.window = { location: { pathname: null } };
  !expect(global.window.location.pathname).toEqual('/');
});

it('should load category list from api', async () => {
  fetch.mockResponse({ data: categories });
  const { getAllByTestId } = renderWithRouter(<NavBar />);
  const categoryList = await waitFor(() => getAllByTestId('dropdown'));

  expect(categoryList).toHaveLength(1);
});
