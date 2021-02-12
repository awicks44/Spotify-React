import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProfile from './UserProfile';

const dummyUser = {
  firstName: 'Test',
  lastName: 'User',
  state: 'KS',
  city: 'Wichita',
  zip: 12345,
  street: '123 W. Hickory st'
};

it('user profile loads with passed user info', () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserProfile user={dummyUser} />
    </MemoryRouter>
  );
  expect(getByText('Address')).toBeInTheDocument();
});

it('goes away after clicking the close button', async () => {
  const mockCallback = jest.fn();
  jest.useFakeTimers();
  const { container } = render(
    <MemoryRouter>
      <UserProfile user={dummyUser} toggleCallback={mockCallback} />
    </MemoryRouter>
  );
  fireEvent.click(container.firstChild.firstChild);
  setTimeout(() => {
    expect(mockCallback).toHaveBeenCalled();
  }, 1100);
  jest.runAllTimers();
});
