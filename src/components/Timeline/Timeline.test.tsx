import { act, fireEvent, render, screen } from '@testing-library/react'
import { allFrequencies } from '../../content/data'
import { HitType } from '../shared.types'
import Timeline from './Timeline'

jest.mock('../../content/data', () => ({
  allFrequencies: [[100, 200, 100], [300, 200]],
  pixelsPerSecond: 100,
  reversedNoteNames: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
}))

jest.mock('../Hit/Hit', () => ({
  __esModule: true,
  default: ({ hit }: { hit: { key: string } }) =>
    require('react').createElement('div', {
      'data-testid': 'hit',
      'data-hit-key': hit.key
    })
}))

const makeHit = (overrides: Partial<HitType> = {}): HitType => ({
  sound: 'sine',
  frequency: 440,
  detune: 0,
  note: 1,
  octave: 0,
  startTime: 1,
  endTime: 2,
  peakStart: 1.2,
  peakEnd: 1.8,
  level: 0.5,
  voiceId: 'voice',
  style: {},
  key: 'hit',
  ...overrides
})

describe('Timeline', () => {
  const originalResizeObserver = global.ResizeObserver
  let resizeCallback: ResizeObserverCallback
  let observe: jest.Mock
  let disconnect: jest.Mock

  beforeEach(() => {
    observe = jest.fn()
    disconnect = jest.fn()
    global.ResizeObserver = jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
      resizeCallback = callback
      return { observe, disconnect, unobserve: jest.fn() }
    }) as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    global.ResizeObserver = originalResizeObserver
    jest.restoreAllMocks()
  })

  it('renders both pianos and sizes the timeline from the latest hit end time', () => {
    render(<Timeline hits={[makeHit({ endTime: 12 })]} />)

    expect(document.getElementById('timeline-piano')).toBeInTheDocument()
    const gridPiano = document.getElementById('timeline-grid-piano')
    expect(gridPiano).toBeInTheDocument()
    expect(gridPiano).toHaveStyle({ width: '1200px' })
    expect(gridPiano?.querySelectorAll('button')).toHaveLength(
      new Set(allFrequencies.flat()).size
    )
    expect(screen.getAllByRole('button').some(button => button.textContent !== '')).toBe(true)
    expect(
      Array.from(gridPiano!.querySelectorAll('button')).every(button => button.textContent === '')
    ).toBe(true)
  })

  it('shows only hits intersecting the visible range and updates that range on scroll and resize', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const hits = [
      makeHit({ key: 'left-boundary', startTime: 2, endTime: 3 }),
      makeHit({ key: 'inside', startTime: 9, endTime: 9.5 }),
      makeHit({ key: 'right-boundary', startTime: 10, endTime: 11 }),
      makeHit({ key: 'before', startTime: 1, endTime: 2.99 }),
      makeHit({ key: 'after', startTime: 10.01, endTime: 11 }),
      makeHit({ key: 'missing-start', startTime: undefined }),
      makeHit({ key: 'missing-end', endTime: undefined }),
      makeHit({ key: 'missing-frequency', frequency: undefined })
    ]

    const { unmount } = render(<Timeline hits={hits} />)
    const container = document.getElementById('timeline-grid-piano-container')!
    Object.defineProperty(container, 'clientWidth', { configurable: true, value: 300 })
    Object.defineProperty(container, 'scrollLeft', { configurable: true, value: 500 })

    expect(observe).toHaveBeenCalledWith(container)
    fireEvent.scroll(container)

    const visibleKeys = () =>
      screen.getAllByTestId('hit').map(hit => hit.getAttribute('data-hit-key'))
    expect(visibleKeys()).toEqual(['left-boundary', 'inside', 'right-boundary'])

    Object.defineProperty(container, 'clientWidth', { configurable: true, value: 500 })
    act(() => resizeCallback([], {} as ResizeObserver))
    expect(visibleKeys()).toEqual([
      'left-boundary',
      'inside',
      'right-boundary',
      'after'
    ])

    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
