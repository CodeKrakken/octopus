import { VoiceType } from "../components/Voice/Voice.types";
import { runInterval } from "./Synth.functions";

const createMockContext = (state = 'running', currentTime = 0) => (
  {
    state,
    currentTime,
    resume: jest.fn().mockResolvedValue(undefined),
    createOscillator: jest.fn().mockReturnValue({
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      disconnect: jest.fn(),
      frequency: { value: 0 },
      type: 'sine'
    }),
    createGain: jest.fn().mockReturnValue({
      gain: {
        setValueAtTime: jest.fn(),
        linearRampToValueAtTime: jest.fn(),
        value: 0
      },
      connect: jest.fn(),
      disconnect: jest.fn()
    }),
    createMediaElementSource: jest.fn().mockReturnValue({ connect: jest.fn() })
  } as Partial<AudioContext>
)

const runOneInterval = (
  voice: VoiceType,
  context: Partial<AudioContext>
) => {

  const voicesRef = { current: [voice] }

  runInterval(
    voice,
    voicesRef,
    context as AudioContext
  )

  voice.isActive = false
  jest.runAllTimers()
}

export { 
  createMockContext,
  runOneInterval
}