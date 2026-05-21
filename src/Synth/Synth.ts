import { VoiceType }                        from '../components/Voice/Voice.types'
import { defaultSettings }                  from './data'
import { synthSettings }                    from './types'
import { waveforms }                        from '../content/data'
import { RunningRef, VoicesRef, Waveform }  from '../App.types'
import { firstInterval, stopOne }           from '../App.functions'


let settings: synthSettings = defaultSettings
let context: AudioContext

// private functions (scheduling, noteshaping, sample setup)

const getContext = () => {
  
  if (!context) { context = new AudioContext() }
  if (context.state === 'suspended') { context.resume() }
  
  return context
}

export const Synth = {

  settings: settings,
  voices: [] as VoiceType[],

  // start

  start: (runningRef: RunningRef, voicesRef: VoicesRef) => {
    Synth.voices.forEach(voice => firstInterval(voice, context.currentTime, runningRef, voicesRef, waveforms as Waveform[], context))
  },

  // stop

  stop: () => Synth.voices.forEach(voice => stopOne(voice)),

  // add voice

  add: (voice: VoiceType, running: Boolean, runningRef: RunningRef, voicesRef: VoicesRef) => {
    Synth.voices.push(voice)
    const nextInterval = voice.nextInterval
    context = getContext()
    if (running) firstInterval(voice, nextInterval, runningRef, voicesRef, waveforms as Waveform[], context)
  },
  
  // delete voice

  delete: (i: number) => {Synth.voices = Synth.voices.filter((voice, j) => j !== i)},

  // update voice

  update: (voice: VoiceType, i: number) => Synth.voices[i] = voice

}