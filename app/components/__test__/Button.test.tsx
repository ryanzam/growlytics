import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Button from '../Button';

describe('Button Component', () => {
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  it('renders the title text correctly', async () => {
    const { getByText } = await render(
      <Button title="Sign in" loading={false} handleClick={mockHandleClick} />
    );

    expect(getByText('Sign in')).toBeTruthy();
  });

  it('triggers the handleClick function when pressed', async () => {
    const { getByText } = await render(
      <Button title="Submit" loading={false} handleClick={mockHandleClick} />
    );

    const buttonText = getByText('Submit');
    fireEvent.press(buttonText);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it('disables interactions when the loading prop is true', async () => {
    const { getByText } = await render(
      <Button title="Loading Asset" loading={true} handleClick={mockHandleClick} />
    );

    const buttonText = getByText('Loading Asset');
    fireEvent.press(buttonText);

    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it('applies the appropriate visual disabled style state when loading is true', async () => {
    const { getByText } = await render(
      <Button title="Disabled State" loading={true} handleClick={mockHandleClick} />
    );

    const buttonElement = getByText('Disabled State').parent;

    expect(buttonElement).toHaveStyle({ backgroundColor: '#9ca3af' });
  });
});
