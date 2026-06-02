import { VoiceType }                          from '../components/Voice/Voice.types'
import { waveforms }                          from '../content/data'
import { RunningRef, VoicesRef, Waveform }    from './Synth.types'
import { firstInterval, getContext, stopOne } from './Synth.functions'

let context: AudioContext

export const Synth = {

  voices: [] as VoiceType[],

  start: (runningRef: RunningRef, voicesRef: VoicesRef) => {
    Synth.voices.forEach(voice => firstInterval(voice, context.currentTime, runningRef, voicesRef, waveforms as Waveform[], context))
  },

  stop: () => Synth.voices.forEach(voice => stopOne(voice)),

  add: (voice: VoiceType, runningRef: RunningRef, voicesRef: VoicesRef) => {
    Synth.voices.push(voice)
    const nextInterval = voice.nextInterval
    context = getContext(context)
    const running = runningRef.current
    if (running) firstInterval(voice, nextInterval, runningRef, voicesRef, waveforms as Waveform[], context)
  },
  
  delete: (i: number) => {Synth.voices = Synth.voices.filter((voice, j) => j !== i)},

  update: (voice: VoiceType, i: number) => Synth.voices[i] = voice
}