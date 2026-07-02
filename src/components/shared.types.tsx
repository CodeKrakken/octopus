import { ranges } from "../content/data"

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

export type {
  NumericAttribute,
  Range,
  ButtonGroupType,
  Slider
}