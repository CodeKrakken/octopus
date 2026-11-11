import { fireEvent, render, screen } from '@testing-library/react'
import Hit from './Hit'
import { HitType } from '../shared.types'

jest.mock('../../content/data', () => ({
  noteNumberToLetter: { 1: 'C' },
}))

const makeHit = (): HitType => ({
  sound: 'sine',
  frequency: 440,
  detune: 0,
  note: 1,
  octave: 4,
  startTime: 0,
  endTime: 1,
  peakStart: 0,
  peakEnd: 1,
  level: 0.5,
  voiceId: 'voice-1',
  style: { top: 10 },
  key: 'hit-1',
})

describe('Hit', () => {
  it('toggles hit details when clicked', () => {
    render(<Hit hit={makeHit()} />)

    const hit = document.querySelector('.hit')
    expect(hit).toHaveStyle({ top: '10px' })
    expect(document.querySelector('.hit-details')).not.toBeInTheDocument()

    fireEvent.click(hit!)
    expect(screen.getByText('sine')).toBeInTheDocument()
    expect(document.querySelector('.hit-details')).toBeInTheDocument()

    fireEvent.click(hit!)
    expect(document.querySelector('.hit-details')).not.toBeInTheDocument()
  })
})
