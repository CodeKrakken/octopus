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
  attrName: string,
  min: number,
  max: number,
  row?: number,
  className?: string
}

type Group = {  
  label: string  
  buttons?: string[]  
  id: string  
  className?: string
  columns?: number  
}  
  
export type {
  NumericAttribute,
  Range,
  ButtonGroupType,
  Slider,
  Group
}