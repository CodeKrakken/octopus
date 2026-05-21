import { VoiceType } from "../components/Voice/Voice.types"
import { waveforms } from "../content/data"

type VoicesRef = { current: VoiceType[] }

type RunningRef = { current: boolean }

type Waveform = typeof waveforms[number]

type OscGain = {
  oscillator  : OscillatorNode, 
  gain        : GainNode
}

export type {
  Waveform,
  RunningRef, 
  VoicesRef,
  OscGain
}