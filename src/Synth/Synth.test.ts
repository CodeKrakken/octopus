import { Synth }                            from './Synth';  
import { VoiceType, HitType }                        from '../components/shared.types';  
import { runInterval, getContext, playHit, removeSource } from './Synth.functions';
import { createMockContext }                from './Synth.test.functions';  
  
  
jest.mock('../content/data', () => ({  
  demoVoices: []  
}));  
  
jest.mock('./Synth.functions', () => ({  
  runInterval: jest.fn(),  
  playHit: jest.fn(),
  removeSource: jest.fn(),
  getContext: jest.fn(() => ({
    context: {
      currentTime: 0,
      createGain: jest.fn(() => ({
        gain: { setValueAtTime: jest.fn() }
      }))
    },
    masterGain: {
      gain: { setValueAtTime: jest.fn() }
    }
  })),
}));  
  
const makeVoice = (): VoiceType => ({  
  id:               'test-id',  
  isActive:         false,  
  label:            '1',  
  nextInterval:     0,  
  thisInterval:     0,  
  offsetInterval:   0,  
  bpm:              120,  
  minLevel:         100,  
  maxLevel:         100,  
  activeNotes:      ['1','3','5','6','8','10','12','13'],  
  activeOctaves:    ['4'],  
  activeFrequencies:[261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],  
  activeIntervals:  ['1'],  
  activeSounds:     ['sine'],  
  restChance:       0,  
  minLength:        100,  
  maxLength:        100,  
  minOffset:        0,  
  maxOffset:        0,  
  minDetune:        0,  
  maxDetune:        0,  
  minAttack:        100,  
  maxAttack:        100,  
  minDecay:         100,  
  maxDecay:         100,
  colour:           "#33ff00"
})  

const makeHit = (key: string, endTime: number): HitType => ({
  sound: 'sine',
  frequency: 440,
  detune: 0,
  note: 1,
  octave: 0,
  startTime: 0,
  endTime,
  peakStart: 0,
  peakEnd: endTime,
  level: 1,
  voiceId: 'test-voice',
  style: {},
  key
})
  
describe('Synth', () => {  
  
  beforeEach(() => {  
    Synth.voices = [];  
    Synth.recordedHits = []
    Synth.hitsDirty = false
    Synth.setRecordedHits = undefined
    jest.clearAllMocks();  
  });  
  
  describe('add', () => {  
  
    it('calls runInterval when running is true', () => {  
      const voice = makeVoice();  
      const running = true;  
      const voicesRef = { current: [voice] };  
      Synth.add(voice, running, voicesRef);  
      expect(runInterval).toHaveBeenCalled();  
    });  
  });  
  
  
  describe('start', () => {  
  
    it('calls runInterval for each voice with correct arguments', () => {  
      const voice1: VoiceType = makeVoice()  
      const voice2: VoiceType = makeVoice()  
      const running = false;  
      const voicesRef = { current: [voice1, voice2] };  
      const mockContext = createMockContext();  
      const masterGain = { gain: { setValueAtTime: jest.fn() } } as unknown as GainNode
      (getContext as jest.Mock).mockReturnValue({ context: mockContext, masterGain })

      Synth.add(voice1, running, voicesRef);  
      Synth.add(voice2, running, voicesRef);  
      Synth.resumeContext()
      Synth.start(voicesRef);  

      expect(runInterval).toHaveBeenCalledTimes(2);  
      expect(runInterval).toHaveBeenNthCalledWith(
        1, voice1, voicesRef, mockContext, Synth.recordedHits, 0, Synth.setRecordedHits
      );
      expect(runInterval).toHaveBeenNthCalledWith(
        2, voice2, voicesRef, mockContext, Synth.recordedHits, 0, Synth.setRecordedHits
      );
      Synth.stop()
    });  

    it('starts only one recorded-hit flush interval while already running', () => {
      const context = createMockContext('running', 10)
      const masterGain = { gain: { setValueAtTime: jest.fn() } } as unknown as GainNode
      const setIntervalSpy = jest.spyOn(global, 'setInterval')
      ;(getContext as jest.Mock).mockReturnValue({ context, masterGain })
      Synth.resumeContext()

      Synth.start({ current: [] })
      Synth.start({ current: [] })

      expect(setIntervalSpy).toHaveBeenCalledTimes(1)
      expect(masterGain.gain.setValueAtTime).toHaveBeenCalledTimes(2)
      Synth.stop()
      setIntervalSpy.mockRestore()
    })
  });  

  describe('resumeContext', () => {
    it('calls getContext', () => {
      Synth.resumeContext()
      expect(getContext).toHaveBeenCalled()
    })
  })

  describe('replay', () => {
    it('replays hits at the current context time and finishes after the latest hit', () => {
      const context = createMockContext('running', 42) as AudioContext
      const masterGain = { gain: { setValueAtTime: jest.fn() } } as unknown as GainNode
      const earlierHit = makeHit('earlier', 2)
      const finalHit = makeHit('final', 5)
      const setReplaying = jest.fn()
      Synth.recordedHits = [earlierHit, finalHit]
      ;(getContext as jest.Mock).mockReturnValue({ context, masterGain })
      Synth.resumeContext()

      Synth.replay(setReplaying)

      expect(playHit).toHaveBeenNthCalledWith(
        1, earlierHit, context, 42, undefined
      )
      const finalCallback = (playHit as jest.Mock).mock.calls[1][3]
      expect(finalCallback).toEqual(expect.any(Function))
      expect(masterGain.gain.setValueAtTime).toHaveBeenCalledTimes(2)
      expect(masterGain.gain.setValueAtTime).toHaveBeenCalledWith(1, 0)

      finalCallback()
      expect(setReplaying).toHaveBeenCalledWith(false)
    })

    it('keeps the first hit when later hits are earlier or have no end time', () => {
      const context = createMockContext('running', 42) as AudioContext
      const masterGain = { gain: { setValueAtTime: jest.fn() } } as unknown as GainNode
      const latestHit = makeHit('latest', 5)
      const earlierHit = makeHit('earlier', 2)
      const missingEndHit = { ...makeHit('missing-end', 3), endTime: undefined } as unknown as HitType
      const missingEndHit2 = { ...makeHit('missing-end-2', 4), endTime: undefined } as unknown as HitType
      const setReplaying = jest.fn()
      Synth.recordedHits = [missingEndHit, missingEndHit2, latestHit, earlierHit]
      ;(getContext as jest.Mock).mockReturnValue({ context, masterGain })
      Synth.resumeContext()

      Synth.replay(setReplaying)

      const callbacks = (playHit as jest.Mock).mock.calls.map(call => call[3])
      expect(callbacks).toEqual([
        undefined,
        undefined,
        expect.any(Function),
        undefined
      ])
    })
  })

  describe('stop', () => {
    it('removes active hit sources and safely stops when the flush interval is already cleared', () => {
      const context = createMockContext('running', 10)
      const masterGain = { gain: { setValueAtTime: jest.fn() } } as unknown as GainNode
      const source = { source: {}, gainNode: {} } as HitType['source']
      const voice = makeVoice()
      Synth.voices = [voice]
      Synth.recordedHits = [makeHit('with-source', 3), { ...makeHit('without-source', 4), source }]
      ;(getContext as jest.Mock).mockReturnValue({ context, masterGain })
      Synth.resumeContext()
      Synth.start({ current: [voice] })

      Synth.stop()
      Synth.stop()

      expect(removeSource).toHaveBeenCalledWith(source)
      expect(voice.isActive).toBe(false)
      expect(masterGain.gain.setValueAtTime).toHaveBeenCalledWith(0, 0)
    })
  })

  describe('flushRecordedHits', () => {
    it('publishes dirty hits and clears the dirty flag', () => {
      const hit = makeHit('recorded', 3)
      const setRecordedHits = jest.fn()
      Synth.recordedHits = [hit]
      Synth.setRecordedHits = setRecordedHits
      Synth.hitsDirty = true

      Synth.flushRecordedHits()

      expect(setRecordedHits).toHaveBeenCalledWith([hit])
      expect(setRecordedHits.mock.calls[0][0]).not.toBe(Synth.recordedHits)
      expect(Synth.hitsDirty).toBe(false)
    })

    it('does nothing when recorded hits are not dirty or no setter exists', () => {
      const setRecordedHits = jest.fn()
      Synth.recordedHits = [makeHit('recorded', 3)]
      Synth.setRecordedHits = setRecordedHits
      Synth.hitsDirty = false

      Synth.flushRecordedHits()

      expect(setRecordedHits).not.toHaveBeenCalled()

      Synth.hitsDirty = true
      Synth.setRecordedHits = undefined
      Synth.flushRecordedHits()

      expect(setRecordedHits).not.toHaveBeenCalled()
      expect(Synth.hitsDirty).toBe(true)
    })
  })
  
  
  describe('integration', () => {  
  
    it('adds, updates, and deletes voices', () => {  
      const voice1 = makeVoice();  
      const voice2 = makeVoice();  
      const running = false;  
      const voicesRef = { current: [] as VoiceType[] };  
      (getContext as jest.Mock).mockReturnValue({
        context: createMockContext(),
        masterGain: { gain: { setValueAtTime: jest.fn() } }
      })
      Synth.resumeContext()
  
      // add  
      Synth.add(voice1, running, voicesRef);  
      Synth.add(voice2, running, voicesRef);  
      expect(Synth.voices.length).toBe(2);  
  
      // update  
      voice1.bpm = 200;  
      Synth.update(voice1, 0);  
      expect(Synth.voices[0].bpm).toBe(200);  
  
      // delete  
      Synth.delete('test-id');  
      expect(Synth.voices.length).toBe(1);  
      expect(Synth.voices[0]).toBe(voice2);  
  
      // stop  
      Synth.voices[0].isActive = true;  
      Synth.stop();  
      expect(Synth.voices[0].isActive).toBe(false);  
    });  
  });  
});
