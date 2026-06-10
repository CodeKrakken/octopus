import { VoiceType } from "../Voice/Voice.types"

type InputsProps = {
  i         : number
  voices    : VoiceType[]
  setVoices : React.Dispatch<React.SetStateAction<VoiceType[]>>
}

type InputsType = {}

export type {
  InputsProps,
  InputsType
}
