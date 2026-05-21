import { VoiceType }                        from '../components/Voice/Voice.types'
import { waveforms }                        from '../content/data'
import { firstInterval, stopOne }           from '../App.functions'
import { RunningRef, VoicesRef, Waveform } from './types'

let context: AudioContext

const getContext = () => {
  
  if (!context) { context = new AudioContext() }
  if (context.state === 'suspended') { context.resume() }
  
  return context
}

export const Synth = {

  voices: [] as VoiceType[],

  start: (runningRef: RunningRef, voicesRef: VoicesRef) => {
    Synth.voices.forEach(voice => firstInterval(voice, context.currentTime, runningRef, voicesRef, waveforms as Waveform[], context))
  },

  stop: () => Synth.voices.forEach(voice => stopOne(voice)),

  add: (voice: VoiceType, running: Boolean, runningRef: RunningRef, voicesRef: VoicesRef) => {
    Synth.voices.push(voice)
    const nextInterval = voice.nextInterval
    context = getContext()
    if (running) firstInterval(voice, nextInterval, runningRef, voicesRef, waveforms as Waveform[], context)
  },
  
  delete: (i: number) => {Synth.voices = Synth.voices.filter((voice, j) => j !== i)},

  update: (voice: VoiceType, i: number) => Synth.voices[i] = voice

}