import { getContext, firstInterval, stopOne, nextInterval } from './Synth.functions';
import { setUpVoice } from '../components/Interface/Interface.functions';
import { VoiceType } from '../components/Voice/Voice.types';
import { Waveform } from './Synth.types';


jest.mock('../content/data', () => ({
  allFrequencies: [
    [
      261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88,
      523.25, 587.33, 659.25, 698.46, 783.99, 880.00
    ],
  ],
  extrema: ['min', 'max'],
  oneMinute: 60,
  samples: { snare: 'snare.wav' }
}))

const mockOscillator = {
  connect: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  disconnect: jest.fn(),
  frequency: { value: 0 },
  type: 'sine' as OscillatorType
}

const mockGain = {
  gain: {
    setValueAtTime: jest.fn(),
    linearRampToValueAtTime: jest.fn(),
    value: 0
  },
  connect: jest.fn(),
  disconnect: jest.fn()
}

const mockMediaElementSource = { connect: jest.fn() }

const mockResume = jest.fn().mockResolvedValue(undefined)

const createMockContext = (state = 'running', currentTime = 0) => ({
  state,
  currentTime,
  resume: mockResume,
  createOscillator: jest.fn().mockReturnValue(mockOscillator),
  createGain: jest.fn().mockReturnValue(mockGain),
  createMediaElementSource: jest.fn().mockReturnValue(mockMediaElementSource)
})

const MockAudioContext = jest.fn().mockImplementation(() => createMockContext())

global.AudioContext = MockAudioContext as typeof AudioContext

global.Audio = jest.fn().mockImplementation(() => ({ play: jest.fn() })) as typeof Audio


describe('getContext', () => {

  it('creates a new AudioContext when passed null', () => {

    getContext(null)
    
    expect(MockAudioContext).toHaveBeenCalledTimes(1)
  })

  it('resumes a suspended context', () => {
    
    const context = createMockContext('suspended') as unknown as AudioContext

    getContext(context)

    expect(mockResume).toHaveBeenCalledTimes(1)
  })
})


describe('stopOne', () => {

  it('stops multiple voices independently', () => {

    const voice1 = { ...setUpVoice(), isActive: true };
    const voice2 = { ...setUpVoice(), isActive: true };

    stopOne(voice1);

    expect(voice1.isActive).toBe(false);
    expect(voice2.isActive).toBe(true);

    stopOne(voice2);

    expect(voice1.isActive).toBe(false);
    expect(voice2.isActive).toBe(false);
  });
})


describe('firstInterval', () => {

  const runOneInterval = (
    voice: VoiceType,
    context: ReturnType<typeof createMockContext>,
    overrides: { nextInterval?: number; waveforms?: string[] } = {}
  ) => {

    const runningRef = { current: true }
    const voicesRef = { current: [voice] }
    const waveforms = (overrides.waveforms ?? ['sine']) as Waveform[]

    firstInterval(
      voice,
      overrides.nextInterval ?? 0,
      runningRef,
      voicesRef,
      waveforms,
      context as unknown as AudioContext
    )

    voice.isActive = false
    jest.runAllTimers()
  }

  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

  it('plays a sample', () => {

    const voice = {...setUpVoice(), activeSounds: ['snare'] }
    const context = createMockContext('running', 10)

    runOneInterval(voice, context)

    expect(global.Audio).toHaveBeenCalledWith('snare.wav')
  })

  it('schedules note end when noteLength is shorter than intervalLength', () => {

    const voice = {...setUpVoice(), minLength: 50, maxLength: 50 }
    const context = createMockContext('running', 10)

    runOneInterval(voice, context)

    expect(mockGain.gain.setValueAtTime).toHaveBeenCalled()
  })

  it('applies detune when cents are non-zero', () => {

    const voice = {...setUpVoice(), minDetune: 50, maxDetune: 50 }
    const context = createMockContext('running', 10)

    runOneInterval(voice, context)

    const assignedFreq = mockOscillator.frequency.value

    expect(assignedFreq).not.toBe(261.63)
  })

  it('uses non-overlapping fade envelope when fade percentages are small', () => {

    const context = createMockContext('running', 10)

    const voice = {
      ...setUpVoice(), 
      activeOctaves: ['0'],
      minFadeIn : 20,
      maxFadeIn : 20,
      minFadeOut: 20,
      maxFadeOut: 20,
    }

    runOneInterval(voice, context)

    expect(mockGain.gain.linearRampToValueAtTime).toHaveBeenCalled()
  })

  it('uses "0" as interval when activeIntervals is empty', () => {

    const voice = { 
      ...setUpVoice(), 
      activeIntervals: [], 
      restChance: 100 
    };
    
    const runningRef = { current: true };
    const voicesRef = { current: [voice] };
    const mockContext = createMockContext() as unknown as AudioContext;

    firstInterval(voice, 0, runningRef, voicesRef, ['sine'] as any, mockContext);

    runningRef.current = false;

    jest.runAllTimers();

    expect(voice.isActive).toBe(true);
  });

  it('logs "Unknown error" when a non-Error is thrown inside makeSound', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    const throwingContext = {
      ...createMockContext(),
      createOscillator: jest.fn(() => { throw 'string error'; }),
    } as unknown as AudioContext;

    const voice = { ...setUpVoice(), restChance: 0, activeSounds: ['sine'] };
    const runningRef = { current: true };
    const voicesRef = { current: [voice] };

    firstInterval(voice, 0, runningRef, voicesRef, ['sine'] as any, throwingContext);
    runningRef.current = false;
    jest.runAllTimers();

    expect(consoleSpy).toHaveBeenCalledWith('Unknown error', 'string error');
  });

  it('applies negative modifier when detune cents < 0', () => {
    const voice = {
      ...setUpVoice(),
      restChance: 0,
      activeSounds: ['sine'],
      minDetune: -50,
      maxDetune: -10,
    };
    const runningRef = { current: true };
    const voicesRef = { current: [voice] };
    const mockContext = createMockContext() as unknown as AudioContext;

    firstInterval(voice, 0, runningRef, voicesRef, ['sine'] as any, mockContext);
    runningRef.current = false;
    jest.runAllTimers();

    expect(mockContext.createOscillator).toHaveBeenCalled();
  });


  it('logs the error message when an exception is thrown inside runInterval', () => {

    const voice = setUpVoice()
    const context = createMockContext('running', 10)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { })

    Object.defineProperty(context, 'currentTime', {
      get: () => { throw new Error('simulated context error') }
    })
    
    firstInterval(
      voice, 
      0, 
      { current: true }, 
      { current: [voice] }, 
      ['sine'] as Waveform[], 
      context as unknown as AudioContext
    )

    expect(consoleSpy).toHaveBeenCalledWith('simulated context error')

    consoleSpy.mockRestore()
  })

  it('calls runInterval again from the nextInterval setTimeout when voice is still active', () => {
    const calledFunctions: Function[] = []

    jest.spyOn(global, 'setTimeout').mockImplementation((calledFunction: Function) => {
      calledFunctions.push(calledFunction)
      return 0 as unknown as NodeJS.Timeout
    })

    const voice = setUpVoice()
    const context = createMockContext('running', 0)

    firstInterval(
      voice, 
      0, 
      { current: true }, 
      { current: [voice] }, 
      ['sine'] as Waveform[], 
      context as unknown as AudioContext
    )

    calledFunctions[1]()

    expect(calledFunctions.length).toBeGreaterThan(2)

    jest.spyOn(global, 'setTimeout').mockRestore()
  })
});


describe('nextInterval', () => {

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('returns early without scheduling a timer when voice.isActive is false', () => {
    const voice = { ...setUpVoice(), isActive: false };
    const runningRef = { current: true };
    const voicesRef = { current: [voice] };
    const mockContext = { currentTime: 0 } as Partial<AudioContext>;

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    nextInterval(
      voice,
      mockContext as AudioContext,
      runningRef,
      voicesRef,
      ['sine'] as Waveform[]
    );

    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });
});
