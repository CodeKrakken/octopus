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

export { 
  createMockContext
}