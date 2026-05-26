import { render, screen, fireEvent } from '@testing-library/react';
import Field from './Field';
import { setUpVoice } from '../Interface/Interface.functions';
import { VoiceType } from '../Voice/Voice.types';

jest.mock('../../content/data', () => ({
  fields: {
    bpm: {
      label: 'BPM',
      value: 'bpm',
      input: 'single'
    },
    level: {
      label: 'Level',
      value: 'Level',
      input: 'range'
    },
    length: {
      label: 'Length',
      value: 'Length',
      input: 'range'
    }
  },
  extrema: ['min', 'max']
}));

jest.mock('../Inputs/Inputs.functions', () => ({
  updateField: jest.fn()
}));

describe('Field', () => {
  const mockSetVoices = jest.fn();
  const voices: VoiceType[] = [setUpVoice()];
  voices[0].bpm = 120;
  voices[0].minLevel = 30;
  voices[0].maxLevel = 80;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders a label for single input field', () => {
  //   render(
  //     <Field
  //       fieldName="bpm"
  //       i={0}
  //       voices={voices}
  //       setVoices={mockSetVoices}
  //     />
  //   );
  //   expect(screen.getByText('BPM')).toBeInTheDocument();
  // });

  it('renders input field with correct value for single input', () => {
    render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('120')).toBeInTheDocument();
  });

  it('renders single input with number type', () => {
    render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const input = screen.getByDisplayValue('120');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('renders data-voice attribute on input', () => {
    const { container } = render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const input = container.querySelector('[data-voice="0"]');
    expect(input).toBeInTheDocument();
  });

  it('renders data-attribute on input', () => {
    const { container } = render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const input = container.querySelector('[data-attribute="bpm"]');
    expect(input).toBeInTheDocument();
  });

  it('renders two inputs for range field type', () => {
    render(
      <Field
        fieldName="level"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
    expect(screen.getByDisplayValue('80')).toBeInTheDocument();
  });

  it('renders label for range field', () => {
    render(
      <Field
        fieldName="level"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByText('Level')).toBeInTheDocument();
  });

  it('renders min and max data-attributes for range inputs', () => {
    const { container } = render(
      <Field
        fieldName="level"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const minInput = container.querySelector('[data-attribute="minLevel"]');
    const maxInput = container.querySelector('[data-attribute="maxLevel"]');
    expect(minInput).toBeInTheDocument();
    expect(maxInput).toBeInTheDocument();
  });

  it('calls updateField when single input changes', () => {
    const { updateField } = require('../Inputs/Inputs.functions');
    
    render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const input = screen.getByDisplayValue('120');
    fireEvent.change(input, { target: { value: '140' } });

    expect(updateField).toHaveBeenCalled();
  });

  it('calls updateField with correct parameters for single input', () => {
    const { updateField } = require('../Inputs/Inputs.functions');
    
    render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const input = screen.getByDisplayValue('120');
    fireEvent.change(input, { target: { value: '140' } });

    expect(updateField).toHaveBeenCalledWith(
      expect.any(Object),
      'bpm',
      voices,
      0,
      mockSetVoices
    );
  });

  it('calls updateField when range min input changes', () => {
    const { updateField } = require('../Inputs/Inputs.functions');
    
    render(
      <Field
        fieldName="level"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const minInput = screen.getByDisplayValue('30');
    fireEvent.change(minInput, { target: { value: '40' } });

    expect(updateField).toHaveBeenCalledWith(
      expect.any(Object),
      'minLevel',
      voices,
      0,
      mockSetVoices
    );
  });

  it('calls updateField when range max input changes', () => {
    const { updateField } = require('../Inputs/Inputs.functions');
    
    render(
      <Field
        fieldName="level"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    const maxInput = screen.getByDisplayValue('80');
    fireEvent.change(maxInput, { target: { value: '90' } });

    expect(updateField).toHaveBeenCalledWith(
      expect.any(Object),
      'maxLevel',
      voices,
      0,
      mockSetVoices
    );
  });

  it('updates input when voice value changes', () => {
    const { rerender } = render(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('120')).toBeInTheDocument();

    voices[0].bpm = 160;
    rerender(
      <Field
        fieldName="bpm"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('160')).toBeInTheDocument();
  });

  it('handles different voice indices', () => {
    const multiVoices = [setUpVoice(), setUpVoice()];
    multiVoices[0].bpm = 100;
    multiVoices[1].bpm = 200;

    const { rerender } = render(
      <Field
        fieldName="bpm"
        i={0}
        voices={multiVoices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();

    rerender(
      <Field
        fieldName="bpm"
        i={1}
        voices={multiVoices}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();
  });
});
