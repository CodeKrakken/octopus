import { updateVoice } from "../shared.functions"
import { Compound, VoiceType } from "../Voice/Voice.types"

const updateButton = (
  e: React.MouseEvent<HTMLButtonElement>, 
  attribute: Compound, 
  voices: VoiceType[], 
  i: number, 
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
) => {

  if (voices[i][attribute].includes(e.currentTarget.value as any)) {
    voices[i][attribute] = voices[i][attribute].filter(value => value !== e.currentTarget.value)
  } else {
    voices[i][attribute] = [voices[i][attribute], e.currentTarget.value].flat()
  }
  
  updateVoice(voices, i, setVoices)
}

export {
  updateButton
}