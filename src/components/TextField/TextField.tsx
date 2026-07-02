import { updateVoice } from "../shared.functions";
import { NumericAttribute } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";
import './TextField.css'

export default function TextField ({

  attrName,
  i,
  voices,
  setVoices

} : {

  attrName: string,
  i: number,
  voices: VoiceType[],
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>

}) {

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
  
  const props = {
    className: 'text-field',
    'data-voice': i,
    'data-attribute': {attrName},
    type: 'text',
    value: voices[i][attrName as NumericAttribute],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateTextField(e, attrName as 'label', voices, i, setVoices)
  }

  return <input {...props} />
}