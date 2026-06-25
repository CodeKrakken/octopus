import { attributes } from "../../content/data"
import DoubleSlider from "../DoubleSlider/DoubleSlider"
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

  const label = attributes[attrName as keyof typeof attributes].label

  const inputType = attributes[attrName as keyof typeof attributes].inputType

  let input

  switch(inputType) {
    case 'rangeSlider'  : input = <DoubleSlider {...props} />; break;
    case 'SingleSlider' : input = <SingleSlider {...props} />; break;
    default: <></>
  }

  return <>
    {label}
    <br /> 
    {input}
  </>
}