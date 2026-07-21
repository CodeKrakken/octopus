import { updateVoice }  from "../shared.functions";
import { NumericAttribute } from "../shared.types";
import { VoiceType }        from "../Voice/Voice.types";
import './TextField.css'

export default function TextField ({

  attrName,
  i,
  voices,
  setVoices

} : {

  attrName  : string
  i         : number
  voices    : VoiceType[]
  setVoices : React.Dispatch<React.SetStateAction<VoiceType[]>>

}) {

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    voices[i].label = e.target!.value
    updateVoice(voices, i, setVoices)
  }
  
  const props = {
    className         : 'text-field',
    'data-voice'      : i,
    'data-attribute'  : {attrName},
    type              : 'text',
    value             : voices[i][attrName as NumericAttribute],
    onChange          : handleClick
  }

  return <input {...props} />
}