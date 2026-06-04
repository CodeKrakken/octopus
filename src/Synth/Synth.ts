import { VoiceType }                          from '../components/Voice/Voice.types'
import { waveforms }                          from '../content/data'
import { VoicesRef, Waveform }                from './Synth.types'
import { firstInterval, getContext, stopOne } from './Synth.functions'

let context: AudioContext

export const Synth = {

  voices: [] as VoiceType[],

  start: (running: boolean, voicesRef: VoicesRef) => {
    Synth.voices.forEach(voice => firstInterval(voice, context.currentTime, running, voicesRef, waveforms as Waveform[], context))
  },

  stop: () => Synth.voices.forEach(voice => stopOne(voice)),

  add: (voice: VoiceType, running: boolean, voicesRef: VoicesRef) => {
    Synth.voices.push(voice)
    const nextInterval = voice.nextInterval
    context = getContext(context)
    if (running) firstInterval(voice, nextInterval, running, voicesRef, waveforms as Waveform[], context)
  },
  
  delete: (i: number) => {Synth.voices = Synth.voices.filter((voice, j) => j !== i)},

  update: (voice: VoiceType, i: number) => Synth.voices[i] = voice
}