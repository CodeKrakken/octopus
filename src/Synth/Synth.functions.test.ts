import { getContext, firstInterval, stopOne, nextInterval } from './Synth.functions';
import { setUpVoice } from '../components/Interface/Interface.functions';
import { VoiceType } from '../components/Voice/Voice.types';

// Mock Web Audio API
const mockAudioContext = {
  state: 'running',
  currentTime: 0,
  createOscillator: jest.fn(),
  createGain: jest.fn(),
  createMediaElementSource: jest.fn(),
  resume: jest.fn(),
  destination: {}
} as any;

global.AudioContext = jest.fn(() => mockAudioContext) as any;


// Deepwiki
  
jest.mock('../content/data', () => ({  
  allFrequencies: [  
    [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25,  
     587.33, 659.25, 698.46, 783.99, 880.00],  
  ],  
  extrema  : ['min', 'max'],  
  oneMinute: 60,  
  samples  : { snare: 'snare.wav', kick: 'kick.wav' }  
}))  
  
// ── Web Audio API mocks ──────────────────────────────────────────────────────  
  
const mockResume = jest.fn().mockResolvedValue(undefined)  
  
const mockGain = {  
  gain: {  
    setValueAtTime          : jest.fn(),  
    linearRampToValueAtTime : jest.fn(),  
    value                   : 0  
  },  
  connect   : jest.fn(),  
  disconnect: jest.fn()  
}  
  
const mockOscillator = {  
  connect   : jest.fn(),  
  start     : jest.fn(),  
  stop      : jest.fn(),  
  disconnect: jest.fn(),  
  frequency : { value: 0 },  
  type      : 'sine' as OscillatorType  
}  
  
const mockMediaElementSource = { connect: jest.fn() }  
  
const createMockContext = (state = 'running', currentTime = 0) => ({  
  state,  
  currentTime,  
  resume                  : mockResume,  
  createOscillator        : jest.fn().mockReturnValue(mockOscillator),  
  createGain              : jest.fn().mockReturnValue(mockGain),  
  createMediaElementSource: jest.fn().mockReturnValue(mockMediaElementSource),  
  destination             : {}  
})  
  
const MockAudioContext = jest.fn().mockImplementation(() => createMockContext())  
global.AudioContext = MockAudioContext as any  
global.Audio = jest.fn().mockImplementation(() => ({ play: jest.fn() })) as any  
  
// ── Voice factory ────────────────────────────────────────────────────────────  
  
const makeVoice = (overrides: Partial<VoiceType> = {}): VoiceType => ({  
  isActive        : false,  
  label           : 1,  
  nextInterval    : 0,  
  bpm             : 60,  
  minLevel        : 100,  
  maxLevel        : 100,  
  activeNotes     : ['1'],  
  activeOctaves   : ['0'],  
  activeIntervals : ['1'],  
  activeSounds    : ['sine'],  
  restChance      : 0,  
  minLength       : 100,  
  maxLength       : 100,  
  minOffset       : 0,  
  maxOffset       : 0,  
  minDetune       : 0,  
  maxDetune       : 0,  
  minFadeIn       : 100,  
  maxFadeIn       : 100,  
  minFadeOut      : 100,  
  maxFadeOut      : 100,  
  ...overrides  
})  
  
// Helper: call firstInterval with running=true, then immediately deactivate the  
// voice so the recurring nextInterval setTimeout exits on its first fire rather  
// than looping forever, then flush all pending timers.  
const runAndFlush = (  
  voice: VoiceType,  
  context: ReturnType<typeof createMockContext>,  
  overrides: { nextInterval?: number; waveforms?: string[] } = {}  
) => {  
  const runningRef = { current: true }  
  const voicesRef  = { current: [voice] }  
  const waveforms  = (overrides.waveforms ?? ['sine']) as any  
  
  firstInterval(voice, overrides.nextInterval ?? 0, runningRef, voicesRef, waveforms, context as unknown as AudioContext)  
  voice.isActive = false   // prevents infinite timer recursion  
  jest.runAllTimers()  
}  
  
// ── getContext ───────────────────────────────────────────────────────────────  
  
describe('getContext', () => {  
  beforeEach(() => jest.clearAllMocks())  
  
  it('creates a new AudioContext when passed null', () => {  
    getContext(null)  
    expect(MockAudioContext).toHaveBeenCalledTimes(1)  
  })  
  
  // it('returns the existing context when one is provided', () => {  
  //   const existing = createMockContext() as unknown as AudioContext  
  //   const result   = getContext(existing)  
  //   expect(MockAudioContext).not.toHaveBeenCalled()  
  //   expect(result).toBe(existing)  
  // })  
  
  it('resumes a suspended context', () => {  
    const ctx = createMockContext('suspended') as unknown as AudioContext  
    getContext(ctx)  
    expect(mockResume).toHaveBeenCalledTimes(1)  
  })  
  
  // it('does not resume a running context', () => {  
  //   const ctx = createMockContext('running') as unknown as AudioContext  
  //   getContext(ctx)  
  //   expect(mockResume).not.toHaveBeenCalled()  
  // })  
})  
  
// ── stopOne ──────────────────────────────────────────────────────────────────  
  
describe('stopOne', () => {  
  // it('sets voice.isActive to false', () => {  
  //   const voice = makeVoice({ isActive: true })  
  //   stopOne(voice)  
  //   expect(voice.isActive).toBe(false)  
  // })  
  
  // it('does not modify other voice properties', () => {  
  //   const voice = makeVoice({ isActive: true, bpm: 120, restChance: 50 })  
  //   stopOne(voice)  
  //   expect(voice.bpm).toBe(120)  
  //   expect(voice.restChance).toBe(50)  
  // })  

  // it('stops an already inactive voice without error', () => {
  //   const voice = setUpVoice();
  //   voice.isActive = false;

  //   expect(() => stopOne(voice)).not.toThrow();
  //   expect(voice.isActive).toBe(false);
  // });

  // it('can be called multiple times on same voice', () => {
  //   const voice = setUpVoice();
  //   voice.isActive = true;

  //   stopOne(voice);
  //   stopOne(voice);
  //   stopOne(voice);

  //   expect(voice.isActive).toBe(false);
  // });

  it('stops multiple voices independently', () => {
    const voice1 = setUpVoice();
    const voice2 = setUpVoice();
    voice1.isActive = true;
    voice2.isActive = true;

    stopOne(voice1);

    expect(voice1.isActive).toBe(false);
    expect(voice2.isActive).toBe(true);

    stopOne(voice2);

    expect(voice1.isActive).toBe(false);
    expect(voice2.isActive).toBe(false);
  });
})  
  
// ── firstInterval / runInterval / makeSound / oscillate ─────────────────────  
  
describe('firstInterval', () => {  
  beforeEach(() => {  
    jest.clearAllMocks()  
    jest.useFakeTimers()  
  })  
  afterEach(() => jest.useRealTimers())  
  
  // it('sets voice.nextInterval to the provided value', () => {  
  //   const voice = makeVoice()  
  //   const ctx   = createMockContext('running', 0)  
  //   firstInterval(voice, 42, { current: false }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  //   expect(voice.nextInterval).toBe(42)  
  // })  
  
  // it('sets voice.isActive to true', () => {  
  //   const voice = makeVoice()  
  //   const ctx   = createMockContext('running', 0)  
  //   firstInterval(voice, 0, { current: false }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  //   expect(voice.isActive).toBe(true)  
  // })  
  
  // it('does not schedule timers when not running', () => {  
  //   const voice = makeVoice()  
  //   const ctx   = createMockContext('running', 0)  
  //   firstInterval(voice, 0, { current: false }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  //   expect(jest.getTimerCount()).toBe(0)  
  // })  
  
  // it('advances voice.nextInterval by intervalLength when it is time', () => {  
  //   // currentTime=10 >= nextInterval=0 → isTimeFor true  
  //   // intervalLength = oneMinute/bpm * interval = 60/60 * 1 = 1  
  //   const voice = makeVoice({ bpm: 60, activeIntervals: ['1'] })  
  //   const ctx   = createMockContext('running', 10)  
  //   runAndFlush(voice, ctx)  
  //   expect(voice.nextInterval).toBe(1)  
  // })  
  
  // it('schedules a timer when running but not yet time', () => {  
  //   const voice = makeVoice()  
  //   const ctx   = createMockContext('running', 0)  
  //   firstInterval(voice, 10, { current: true }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  //   expect(jest.getTimerCount()).toBeGreaterThan(0)  
  // })  
  
  // it('creates an oscillator when the sound is a waveform', () => {  
  //   const voice = makeVoice({ activeSounds: ['sine'] })  
  //   const ctx   = createMockContext('running', 10)  
  //   runAndFlush(voice, ctx, { waveforms: ['sine'] })  
  //   expect(ctx.createOscillator).toHaveBeenCalled()  
  // })  
  
  it('plays a sample when the sound is not a waveform', () => {  
    const voice = makeVoice({ activeSounds: ['snare'] })  
    const ctx   = createMockContext('running', 10)  
    runAndFlush(voice, ctx, { waveforms: ['sine'] })  
    expect(global.Audio).toHaveBeenCalledWith('snare.wav')  
  })  
  
  // it('skips makeSound when the interval is a rest', () => {  
  //   const voice = makeVoice({ restChance: 100 })  // always a rest  
  //   const ctx   = createMockContext('running', 10)  
  //   runAndFlush(voice, ctx)  
  //   expect(ctx.createOscillator).not.toHaveBeenCalled()  
  //   expect(global.Audio).not.toHaveBeenCalled()  
  // })  
  
  it('schedules note end when noteLength is shorter than intervalLength', () => {  
    // minLength=50 → noteLength = intervalLength * 0.5 < intervalLength  
    const voice = makeVoice({ minLength: 50, maxLength: 50 })  
    const ctx   = createMockContext('running', 10)  
    runAndFlush(voice, ctx)  
    // scheduleNoteEnd calls gain.setValueAtTime inside a setTimeout;  
    // after runAllTimers it should have been called at least twice  
    // (once from oscillate setup, once from scheduleNoteEnd)  
    expect(mockGain.gain.setValueAtTime).toHaveBeenCalled()  
  })  
  
  it('applies detune when cents are non-zero', () => {  
    const voice = makeVoice({ minDetune: 50, maxDetune: 50 })  
    const ctx   = createMockContext('running', 10)  
    runAndFlush(voice, ctx)  
    // detuned frequency differs from the base 261.63  
    const assignedFreq = mockOscillator.frequency.value  
    expect(assignedFreq).not.toBe(261.63)  
  })  
  
  it('uses non-overlapping fade envelope when fade percentages are small', () => {  
    // fadeIn=20%, fadeOut=20% → endOfFadeIn < startOfFadeOut → overlap=false  
    const voice = makeVoice({ minFadeIn: 20, maxFadeIn: 20, minFadeOut: 20, maxFadeOut: 20 })  
    const ctx   = createMockContext('running', 10)  
    runAndFlush(voice, ctx)  
    // linearRampToValueAtTime is called in both overlap and non-overlap paths  
    expect(mockGain.gain.linearRampToValueAtTime).toHaveBeenCalled()  
  })  
  
  // it('stops scheduling when voice.isActive becomes false before the timer fires', () => {  
  //   const voice = makeVoice()  
  //   const ctx   = createMockContext('running', 0)  
  //   firstInterval(voice, 10, { current: true }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  //   voice.isActive = false  
  //   jest.runAllTimers()  
  //   expect(jest.getTimerCount()).toBe(0)  
  // })  
})

it('logs the error message when an exception is thrown inside runInterval', () => {  
  const voice = makeVoice()  
  const ctx   = createMockContext('running', 10)  
  Object.defineProperty(ctx, 'currentTime', {  
    get: () => { throw new Error('simulated context error') }  
  })  
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})  
  
  firstInterval(voice, 0, { current: true }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  
  expect(consoleSpy).toHaveBeenCalledWith('simulated context error')  
  consoleSpy.mockRestore()  
})

it('calls runInterval again from the nextInterval setTimeout when voice is still active', () => {  
  const callbacks: Function[] = []  
  
  // Replace setTimeout (fake or real) with a simple capture mock  
  jest.spyOn(global, 'setTimeout').mockImplementation((cb: any) => {  
    callbacks.push(cb)  
    return 0 as any  
  })  
  
  const voice = makeVoice()  
  const ctx   = createMockContext('running', 0)  
  
  firstInterval(voice, 0, { current: true }, { current: [voice] }, ['sine'] as any, ctx as unknown as AudioContext)  
  // callbacks[0] = makeSound callback  (scheduled inside makeSound)  
  // callbacks[1] = nextInterval callback (scheduled inside nextInterval function)  
  // voice.isActive is still true  
  
  callbacks[1]()  // fires the nextInterval callback: line 68 guard passes → line 69 executes  
  
  // runInterval ran again → called nextInterval again → pushed a third callback  
  expect(callbacks.length).toBeGreaterThan(2)  
  
  jest.spyOn(global, 'setTimeout').mockRestore()  
})

  
describe('branch coverage', () => {  
  let mockGain: any;  
  let mockOscillator: any;  
  let mockContext: any;  
  
  beforeEach(() => {  
    jest.useFakeTimers();  
  
    mockGain = {  
      connect: jest.fn(),  
      disconnect: jest.fn(),  
      gain: { setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn(), value: 0 },  
    };  
    mockOscillator = {  
      connect: jest.fn(), start: jest.fn(), stop: jest.fn(), disconnect: jest.fn(),  
      frequency: { value: 0 }, type: 'sine',  
    };  
    mockContext = {  
      currentTime: 0,  
      createOscillator: jest.fn(() => mockOscillator),  
      createGain: jest.fn(() => mockGain),  
      destination: {},  
    };  
  });  
  
  afterEach(() => {  
    jest.useRealTimers();  
    jest.restoreAllMocks();  
  });  
  
  // Line 79: || '0' fallback when activeIntervals is empty  
  it('uses "0" as interval when activeIntervals is empty', () => {  
    const voice = { ...setUpVoice(), activeIntervals: [], restChance: 100 };  
    const runningRef = { current: true };  
    const voicesRef = { current: [voice] };  
  
    firstInterval(voice, 0, runningRef, voicesRef, ['sine'] as any, mockContext);  
    runningRef.current = false;  
    jest.runAllTimers();  
  
    expect(voice.isActive).toBe(true);  
  });  
  
  // Line 117: "Unknown error" branch when a non-Error is thrown  
  it('logs "Unknown error" when a non-Error is thrown inside makeSound', () => {  
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});  
    const throwingContext = {  
      ...mockContext,  
      createOscillator: jest.fn(() => { throw 'string error'; }),  
    };  
  
    const voice = { ...setUpVoice(), restChance: 0, activeSounds: ['sine'] };  
    const runningRef = { current: true };  
    const voicesRef = { current: [voice] };  
  
    firstInterval(voice, 0, runningRef, voicesRef, ['sine'] as any, throwingContext);  
    runningRef.current = false;  
    jest.runAllTimers();  
  
    expect(consoleSpy).toHaveBeenCalledWith('Unknown error', 'string error');  
  });  
  
  // Line 252: cents < 0 branch in detune  
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
  
    firstInterval(voice, 0, runningRef, voicesRef, ['sine'] as any, mockContext);  
    runningRef.current = false;  
    jest.runAllTimers();  
  
    expect(mockContext.createOscillator).toHaveBeenCalled();  
  });  
});

  
describe('nextInterval', () => {  
  beforeEach(() => {  
    jest.useFakeTimers();  
  });  
  
  afterEach(() => {  
    jest.useRealTimers();  
  });  
  
  it('returns early without scheduling a timer when voice.isActive is false', () => {  
    const voice = { ...setUpVoice(), isActive: false };  
    const runningRef = { current: true };  
    const voicesRef = { current: [voice] };  
    const mockContext = { currentTime: 0 } as any;  
  
    nextInterval(voice, mockContext, runningRef, voicesRef, ['sine'] as any);  
  
    expect(jest.getTimerCount()).toBe(0);  
  });  
});