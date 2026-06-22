import { updateTextField } from "../Inputs/Inputs.functions";
import { Atom } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";

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
  
  const props = {
    className: 'text-field',
    'data-voice': i,
    'data-attribute': {attrName},
    type: 'number',
    value: voices[i][attrName as Atom],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateTextField(e, attrName as Atom, voices, i, setVoices)
  }

  return <div>
    <input {...props} />
  </div>
}