import { ranges } from "../content/data"
import ButtonGrid from "./ButtonGrid/ButtonGrid"
import Piano from "./Piano/Piano"
import { VoiceType } from "./Voice/Voice.types"

type Range = typeof ranges[number]

type NumericAttribute = 
  'bpm'
| 'restChance'
| `min${Range}`
| `max${Range}`

type ButtonGroupType = 
  'Notes' 
| 'Octaves' 
| 'Intervals'
| 'Sounds'

type Slider = {
  label: string,
  value: string,    
  key: string,
  min: number,
  max: number,
  row?: number
}

type Group = {
  label: string
  boxes: string[]
  id: string
  className: string
}

type ButtonGroupProps = {
  group: Group,
  voices: VoiceType[],
  i: number,
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
  component?: typeof ButtonGrid | typeof Piano  }

export type {
  NumericAttribute,
  Range,
  ButtonGroupType,
  Slider,
  Group,
  ButtonGroupProps
}