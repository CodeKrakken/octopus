import { VoiceType } from "../components/Voice/Voice.types"

type VoicesRef = { current: VoiceType[] }

type OscGain = {
  oscillator  : OscillatorNode, 
  gainNode    : GainNode
}

export type {
  VoicesRef,
  OscGain
}