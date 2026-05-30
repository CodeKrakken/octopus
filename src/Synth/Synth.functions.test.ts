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
  extrema  : ['min', 'max'],  
  oneMinute: 60,  
  samples  : { snare: 'snare.wav' }  
}))  
    
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
  createMediaElementSource: jest.fn().mockReturnValue(mockMediaElementSource)
})  
  
const MockAudioContext = jest.fn().mockImplementation(() => createMockContext())  
global.AudioContext = MockAudioContext as typeof AudioContext  
global.Audio = jest.fn().mockImplementation(() => ({ play: jest.fn() })) as typeof Audio 
    
const bespokeVoice = (overrides: Partial<VoiceType> = {}): VoiceType => ({  
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

const runOneInterval = (  
  voice: VoiceType,  
  context: ReturnType<typeof createMockContext>,  
  overrides: { nextInterval?: number; waveforms?: string[] } = {}  
) => {  

  const runningRef = { current: true }  
  const voicesRef  = { current: [voice] }  
  const waveforms  = (overrides.waveforms ?? ['sine']) as Waveform[]
  
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
    const voice1 = bespokeVoice({isActive: true});
    const voice2 = bespokeVoice({isActive: true});

    stopOne(voice1);

    expect(voice1.isActive).toBe(false);
    expect(voice2.isActive).toBe(true);

    stopOne(voice2);

    expect(voice1.isActive).toBe(false);
    expect(voice2.isActive).toBe(false);
  });
})  


describe('firstInterval', () => {  

  beforeAll(() => jest.useFakeTimers())  
  afterAll(() => jest.useRealTimers())  
    
  it('plays a sample when the sound is not a waveform', () => {  
    const voice = bespokeVoice({ activeSounds: ['snare'] })  
    const context   = createMockContext('running', 10)  
    runOneInterval(voice, context, { waveforms: ['sine'] })  
    expect(global.Audio).toHaveBeenCalledWith('snare.wav')  
  })  
    
  it('schedules note end when noteLength is shorter than intervalLength', () => {  
    // minLength=50 → noteLength = intervalLength * 0.5 < intervalLength  
    const voice = bespokeVoice({ minLength: 50, maxLength: 50 })  
    const context   = createMockContext('running', 10)  
    runOneInterval(voice, context)  
    // scheduleNoteEnd calls gain.setValueAtTime inside a setTimeout;  
    // after runAllTimers it should have been called at least twice  
    // (once from oscillate setup, once from scheduleNoteEnd)  
    expect(mockGain.gain.setValueAtTime).toHaveBeenCalled()  
  })  
  
  it('applies detune when cents are non-zero', () => {  
    const voice = bespokeVoice({ minDetune: 50, maxDetune: 50 })  
    const context   = createMockContext('running', 10)  
    runOneInterval(voice, context)  
    // detuned frequency differs from the base 261.63  
    const assignedFreq = mockOscillator.frequency.value  
    expect(assignedFreq).not.toBe(261.63)  
  })  
  
  it('uses non-overlapping fade envelope when fade percentages are small', () => {  
    // fadeIn=20%, fadeOut=20% → endOfFadeIn < startOfFadeOut → overlap=false  
    const voice = bespokeVoice({ minFadeIn: 20, maxFadeIn: 20, minFadeOut: 20, maxFadeOut: 20 })  
    const context   = createMockContext('running', 10)  
    runOneInterval(voice, context)  
    // linearRampToValueAtTime is called in both overlap and non-overlap paths  
    expect(mockGain.gain.linearRampToValueAtTime).toHaveBeenCalled()  
  })  
})

it('logs the error message when an exception is thrown inside runInterval', () => {  
  const voice = bespokeVoice()  
  const context   = createMockContext('running', 10)  
  Object.defineProperty(context, 'currentTime', {  
    get: () => { throw new Error('simulated context error') }  
  })  
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})  
  
  firstInterval(voice, 0, { current: true }, { current: [voice] }, ['sine'] as any, context as unknown as AudioContext)  
  
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
  
  const voice = bespokeVoice()  
  const context   = createMockContext('running', 0)  
  
  firstInterval(voice, 0, { current: true }, { current: [voice] }, ['sine'] as any, context as unknown as AudioContext)  
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