import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxGroup from './CheckboxGroup';
import { setUpVoice } from '../Interface/Interface.functions';
import { VoiceType } from '../Voice/Voice.types';

jest.mock('../../content/data', () => ({
  checkboxGroups: {
    Sounds: ['sine', 'square', 'triangle'],
    Notes: ['1', '2', '3'],
    Octaves: ['4', '5']
  }
}));

jest.mock('../Inputs/Inputs.functions', () => ({
  updateCheckbox: jest.fn()
}));

describe('CheckboxGroup', () => {
  const mockSetVoices = jest.fn();
  const voices: VoiceType[] = [setUpVoice()];
  voices[0].activeSounds = ['sine'];
  voices[0].activeNotes = ['1', '3'];
  voices[0].activeOctaves = ['4'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders group label', () => {
  //   render(
  //     <CheckboxGroup
  //       groupName="Sounds"
  //       voices={voices}
  //       i={0}
  //       setVoices={mockSetVoices}
  //     />
  //   );
  //   expect(screen.getByText('Sounds')).toBeInTheDocument();
  // });

  // it('renders all checkboxes in the group', () => {
  //   render(
  //     <CheckboxGroup
  //       groupName="Sounds"
  //       voices={voices}
  //       i={0}
  //       setVoices={mockSetVoices}
  //     />
  //   );
  //   expect(screen.getByDisplayValue('sine')).toBeInTheDocument();
  //   expect(screen.getByDisplayValue('square')).toBeInTheDocument();
  //   expect(screen.getByDisplayValue('triangle')).toBeInTheDocument();
  // });

  // it('renders checkboxes with correct type', () => {
  //   render(
  //     <CheckboxGroup
  //       groupName="Sounds"
  //       voices={voices}
  //       i={0}
  //       setVoices={mockSetVoices}
  //     />
  //   );
  //   const checkbox = screen.getByDisplayValue('sine');
  //   expect(checkbox).toHaveAttribute('type', 'checkbox');
  // });

  // it('checks active checkboxes based on voice state', () => {
  //   render(
  //     <CheckboxGroup
  //       groupName="Sounds"
  //       voices={voices}
  //       i={0}
  //       setVoices={mockSetVoices}
  //     />
  //   );
  //   expect(screen.getByDisplayValue('sine')).toBeChecked();
  //   expect(screen.getByDisplayValue('square')).not.toBeChecked();
  // });

  it('sets data-attribute to group name', () => {
    const { container } = render(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    const checkboxes = container.querySelectorAll('[data-attribute="Sounds"]');
    expect(checkboxes.length).toBe(3);
  });

  it('sets data-voice attribute on checkboxes', () => {
    const { container } = render(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    const checkboxes = container.querySelectorAll('[data-voice="0"]');
    expect(checkboxes.length).toBe(3);
  });

  it('calls updateCheckbox when checkbox is clicked', () => {
    const { updateCheckbox } = require('../Inputs/Inputs.functions');
    
    render(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    const checkbox = screen.getByDisplayValue('square');
    fireEvent.click(checkbox);

    expect(updateCheckbox).toHaveBeenCalled();
  });

  it('calls updateCheckbox with correct parameters', () => {
    const { updateCheckbox } = require('../Inputs/Inputs.functions');
    
    render(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    const checkbox = screen.getByDisplayValue('square');
    fireEvent.click(checkbox);

    expect(updateCheckbox).toHaveBeenCalledWith(
      expect.any(Object),
      'activeSounds',
      voices,
      0,
      mockSetVoices
    );
  });

  it('renders different checkbox group', () => {
    render(
      <CheckboxGroup
        groupName="Notes"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('handles multiple checked values', () => {
    render(
      <CheckboxGroup
        groupName="Notes"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('1')).toBeChecked();
    expect(screen.getByDisplayValue('3')).toBeChecked();
    expect(screen.getByDisplayValue('2')).not.toBeChecked();
  });

  it('updates checked state when voice changes', () => {
    const { rerender } = render(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('sine')).toBeChecked();
    expect(screen.getByDisplayValue('square')).not.toBeChecked();

    voices[0].activeSounds = ['square'];
    rerender(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('sine')).not.toBeChecked();
    expect(screen.getByDisplayValue('square')).toBeChecked();
  });

  it('uses correct prefix for compound attribute (activeSounds)', () => {
    const { updateCheckbox } = require('../Inputs/Inputs.functions');
    
    render(
      <CheckboxGroup
        groupName="Sounds"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    fireEvent.click(screen.getByDisplayValue('square'));

    expect(updateCheckbox).toHaveBeenCalledWith(
      expect.any(Object),
      'activeSounds',
      voices,
      0,
      mockSetVoices
    );
  });

  it('uses correct prefix for compound attribute (activeNotes)', () => {
    const { updateCheckbox } = require('../Inputs/Inputs.functions');
    
    render(
      <CheckboxGroup
        groupName="Notes"
        voices={voices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    fireEvent.click(screen.getByDisplayValue('2'));

    expect(updateCheckbox).toHaveBeenCalledWith(
      expect.any(Object),
      'activeNotes',
      voices,
      0,
      mockSetVoices
    );
  });

  it('handles different voice indices', () => {
    const multiVoices = [setUpVoice(), setUpVoice()];
    multiVoices[0].activeSounds = ['sine'];
    multiVoices[1].activeSounds = ['square'];

    const { rerender } = render(
      <CheckboxGroup
        groupName="Sounds"
        voices={multiVoices}
        i={0}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('sine')).toBeChecked();
    expect(screen.getByDisplayValue('square')).not.toBeChecked();

    rerender(
      <CheckboxGroup
        groupName="Sounds"
        voices={multiVoices}
        i={1}
        setVoices={mockSetVoices}
      />
    );
    expect(screen.getByDisplayValue('sine')).not.toBeChecked();
    expect(screen.getByDisplayValue('square')).toBeChecked();
  });

  it('passes correct voice index in updateCheckbox call', () => {
    const { updateCheckbox } = require('../Inputs/Inputs.functions');
    const multiVoices = [setUpVoice(), setUpVoice(), setUpVoice()];
    multiVoices[0].activeSounds = ['sine'];
    multiVoices[1].activeSounds = ['square'];
    multiVoices[2].activeSounds = ['triangle'];
    
    render(
      <CheckboxGroup
        groupName="Sounds"
        voices={multiVoices}
        i={2}
        setVoices={mockSetVoices}
      />
    );
    fireEvent.click(screen.getByDisplayValue('sine'));

    expect(updateCheckbox).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(String),
      multiVoices,
      2,
      mockSetVoices
    );
  });
});
