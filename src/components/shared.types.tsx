import { ranges } from "../content/data"
import ButtonGrid from "./ButtonGrid/ButtonGrid"
import Piano from "./Piano/Piano"

type Compound = 
  'activeNotes'
| 'activeOctaves'
| 'activeIntervals'
| 'activeSounds'

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
  
type VoiceType = {
  id                : string
  isActive          : boolean
  label             : string
  thisInterval?     : number
  offsetInterval?   : number
  nextInterval      : number
  bpm               : number
  minLevel          : number
  maxLevel          : number
  activeNotes       : string[]
  activeOctaves     : string[]
  activeIntervals   : string[]
  activeSounds      : string[]
  activeFrequencies : number[]
  restChance        : number
  minLength         : number
  maxLength         : number
  minOffset         : number
  maxOffset         : number
  minDetune         : number
  maxDetune         : number
  minAttack         : number
  maxAttack         : number
  minDecay          : number
  maxDecay          : number
}

export type {
  NumericAttribute,
  Range,
  ButtonGroupType,
  Slider,
  Group,
  VoiceType, 
  Compound
}