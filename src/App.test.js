import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Default from './Default';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Default />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
