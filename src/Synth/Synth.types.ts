import { VoiceType } from "../components/shared.types"

type VoicesRef = { current: VoiceType[] }

type OscGain = {
  oscillator  : OscillatorNode, 
  gainNode    : GainNode
}

export type {
  VoicesRef,
  OscGain
}