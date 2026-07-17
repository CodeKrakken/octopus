import { allFrequencies } from "../content/data"
import { Synth } from "../Synth/Synth"
import { VoiceType } from "./Voice/Voice.types"

const getActiveFrequencies = (voice: VoiceType) => {
  
  const { activeOctaves, activeNotes } = voice

  let allFrequenciesInOctaves = allFrequencies.filter(
    (octave, j) => activeOctaves.includes(j.toString())
  )

  let activeFrequencies = allFrequenciesInOctaves.map(octave =>
    octave.filter((note, j) => activeNotes.includes((j+1).toString()))
  )

  return activeFrequencies.flat(Infinity)
}

const updateVoice = (voices: VoiceType[], i: number, setVoices: Function) => {
  const voice = voices[i]
  voice.activeFrequencies = getActiveFrequencies(voice) as number[]
  setVoices([voices.slice(0,i), voice, voices.slice(i+1)].flat())
  Synth.update(voice, i)
}

const updateTextField = (
  e: React.ChangeEvent<HTMLInputElement>, 
  attribute: 'label',
  voices: VoiceType[], 
  i: number,
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
) => {

  voices[i][attribute] = e.target!.value
  updateVoice(voices, i, setVoices)
}

export {
  updateVoice,
  updateTextField
}