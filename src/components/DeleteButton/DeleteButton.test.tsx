import { render, screen, fireEvent } from '@testing-library/react';
import DeleteButton from './DeleteButton';

describe('DeleteButton', () => {

  const mockHandleDelete = jest.fn();

  beforeEach(() => { jest.clearAllMocks(); });

  it('passes correct index on click', () => {

    const Button = (i: number) => (
      <DeleteButton
        handleDelete={mockHandleDelete}
        i={i}
      />
    );

    render(Button(1));

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockHandleDelete).toHaveBeenCalledWith(1);
  });
});
