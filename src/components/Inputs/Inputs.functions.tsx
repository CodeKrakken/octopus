import { Synth }                from "../../Synth/Synth"
import { NumericAttribute }                 from "../shared.types"
import { Compound, VoiceType }  from "../Voice/Voice.types"


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


const updateCheckbox = (
  e: React.MouseEvent<HTMLButtonElement>, 
  attribute: Compound, 
  voices: VoiceType[], 
  i: number, 
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
) => {

  if ((voices[i][attribute]).includes(e.target.value)) {
    voices[i][attribute] = voices[i][attribute].filter(value => value !== e.target.value)
  } else {
    voices[i][attribute] = [voices[i][attribute], e.target.value].flat()
  }
  
  updateVoice(voices, i, setVoices)
}

// private

const updateVoice = (voices: VoiceType[], i: number, setVoices: Function) => {
  const voice = voices[i]
  setVoices([voices.slice(0,i), voice, voices.slice(i+1)].flat())
  Synth.update(voice, i)
}


export {
  updateCheckbox,
  updateTextField
}