import { render, screen } from '@testing-library/react';
import Voice from './Voice';
import { setUpVoice } from '../Interface/Interface.functions';
import { VoiceType } from './Voice.types';

jest.mock('../../content/data', () => ({
  fields: { bpm: { value: 'bpm' } },
  checkboxGroups: {}
}));

describe('Voice', () => {
  const mockHandleDelete = jest.fn();
  const mockSetVoices = jest.fn();

  beforeEach(() => { jest.clearAllMocks(); });

  it('handles multiple voices with different indices', () => {
    const multipleVoices = [setUpVoice(), setUpVoice()];
    multipleVoices[0].bpm = 100;
    multipleVoices[1].bpm = 150;

    const { rerender } = render(
      <Voice
        i={0}
        voices={multipleVoices}
        handleDelete={mockHandleDelete}
        setVoices={mockSetVoices}
        dataAttribute="Voices"
      />
    );
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();

    rerender(
      <Voice
        i={1}
        voices={multipleVoices}
        handleDelete={mockHandleDelete}
        setVoices={mockSetVoices}
        dataAttribute="Voices"
      />
    );
    expect(screen.getByDisplayValue('150')).toBeInTheDocument();
  });
});
