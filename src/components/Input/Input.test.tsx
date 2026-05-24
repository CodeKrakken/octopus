import { render, screen } from '@testing-library/react';  
import Input from './Input';  
  
describe('Input', () => {  
  it('renders an input element with the given props', () => {  
    render(  
      <Input  
        className="test-class"  
        data-voice={0}  
        data-attribute="bpm"  
        type="number"  
        value={120}  
        onChange={jest.fn()}  
      />  
    );  
  
    const input = screen.getByDisplayValue('120');  
    expect(input).toBeInTheDocument();  
    expect(input).toHaveAttribute('type', 'number');  
    expect(input).toHaveClass('test-class');  
  });  
});
