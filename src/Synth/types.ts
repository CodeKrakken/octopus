import { VoiceType } from "../components/Voice/Voice.types"
import { waveforms } from "../content/data"

type synthSettings = {}

export type { synthSettings }

type VoicesRef = { current: VoiceType[] }

type RunningRef = { current: boolean }

type Waveform = typeof waveforms[number]

export type {
  Waveform,
  RunningRef, 
  VoicesRef
}