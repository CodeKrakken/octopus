import { updateVoice } from "../shared.functions"
import { Compound, VoiceType } from "../Voice/Voice.types"

const updateButton = (
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

export {
  updateButton
}