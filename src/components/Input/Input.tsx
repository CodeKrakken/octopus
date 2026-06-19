import { attributes } from "../../content/data"
import DoubleSlider from "../DoubleSlider/DoubleSlider"
import Field from "../Field/Field"
import SingleSlider from "../SingleSlider/SingleSlider"
import { VoiceType } from "../Voice/Voice.types"

export default function Input({

  attrName,
  i,
  voices,
  setVoices

}: {

  attrName: string,
  i: number,
  voices: VoiceType[],
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
  
}) {

  const props = {
    attrName: attrName,
    i: i,
    voices: voices,
    setVoices: setVoices,
    key: attrName
  }

  const inputType = attributes[attrName as keyof typeof attributes].inputType

  let input = <></>

  if (inputType === 'rangeSlider') { 
    input = <DoubleSlider {...props} />
  } else if (inputType === 'singleValueSlider') { 
    input = <SingleSlider {...props} /> 
  } else if (inputType === 'textbox') { 
    input = <Field {...props} />
  }

  return (
    <div className="row">
      <div className="label">
        {attributes[attrName as keyof typeof attributes].label}
      </div>
      {input}
    </div>
  )
}