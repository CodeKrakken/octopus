import { render, screen, fireEvent } from '@testing-library/react';
import DeleteButton from './DeleteButton';

describe('DeleteButton', () => {
  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders a button with X text', () => {
  //   render(
  //     <DeleteButton
  //       handleDelete={mockHandleDelete}
  //       i={0}
  //     />
  //   );
  //   expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
  // });

  // it('calls handleDelete with correct index when clicked', () => {
  //   render(
  //     <DeleteButton
  //       handleDelete={mockHandleDelete}
  //       i={0}
  //     />
  //   );
  //   const button = screen.getByRole('button', { name: 'X' });
  //   fireEvent.click(button);
  //   expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  //   expect(mockHandleDelete).toHaveBeenCalledWith(0);
  // });

  // it('calls handleDelete with different index when specified', () => {
  //   render(
  //     <DeleteButton
  //       handleDelete={mockHandleDelete}
  //       i={3}
  //     />
  //   );
  //   const button = screen.getByRole('button', { name: 'X' });
  //   fireEvent.click(button);
  //   expect(mockHandleDelete).toHaveBeenCalledWith(3);
  // });

  // it('has id delete-voice', () => {
  //   const { container } = render(
  //     <DeleteButton
  //       handleDelete={mockHandleDelete}
  //       i={0}
  //     />
  //   );
  //   const button = container.querySelector('#delete-voice');
  //   expect(button).toBeInTheDocument();
  // });

  // it('calls handleDelete each time button is clicked', () => {
  //   render(
  //     <DeleteButton
  //       handleDelete={mockHandleDelete}
  //       i={1}
  //     />
  //   );
  //   const button = screen.getByRole('button', { name: 'X' });
  //   fireEvent.click(button);
  //   fireEvent.click(button);
  //   expect(mockHandleDelete).toHaveBeenCalledTimes(2);
  // });

  it('passes correct index on multiple clicks', () => {
    const { rerender } = render(
      <DeleteButton
        handleDelete={mockHandleDelete}
        i={0}
      />
    );
    const button = screen.getByRole('button', { name: 'X' });
    fireEvent.click(button);

    jest.clearAllMocks();
    
    rerender(
      <DeleteButton
        handleDelete={mockHandleDelete}
        i={1}
      />
    );
    fireEvent.click(button);
    expect(mockHandleDelete).toHaveBeenCalledWith(1);
  });
});
