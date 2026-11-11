import { render, screen } from '@testing-library/react'
import HitDetails from './HitDetails'
import { HitType } from '../shared.types'

jest.mock('../../content/data', () => ({
  noteNumberToLetter: { 1: 'C' },
}))

const makeHit = (peakStart: number, peakEnd: number): HitType => ({
  sound: 'sine',
  frequency: 440,
  detune: 0,
  note: 1,
  octave: 4,
  startTime: 0,
  endTime: 1,
  peakStart,
  peakEnd,
  level: 0.5,
  voiceId: 'voice-1',
  style: {},
  key: 'hit-1',
})

describe('HitDetails peak display', () => {
  it('omits peak details when the peak starts with the hit', () => {
    render(<HitDetails hit={makeHit(0, 0.75)} />)

    expect(screen.queryByText(/Peak -/)).not.toBeInTheDocument()
  })

  it('displays a single peak time when peak start and end are equal', () => {
    render(<HitDetails hit={makeHit(0.25, 0.25)} />)

    expect(screen.getByText(/Peak - 0.25/)).toBeInTheDocument()
    expect(screen.queryByText(/0.25\s+-\s+0.25/)).not.toBeInTheDocument()
  })

  it('displays the peak time range when peak start and end differ', () => {
    render(<HitDetails hit={makeHit(0.25, 0.75)} />)

    expect(screen.getByText(/Peak - 0.25\s+-\s+0.75/)).toBeInTheDocument()
  })
})
