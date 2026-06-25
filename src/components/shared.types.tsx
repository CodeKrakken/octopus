import { ranges } from "../content/data"

type Range = typeof ranges[number]

type NumericAttribute = 
  'bpm'
| 'restChance'
| `min${Range}`
| `max${Range}`

type CheckboxGroupType = 
  'Notes' 
| 'Octaves' 
| 'Intervals'
| 'Sounds' 

export type {
  NumericAttribute,
  Range,
  CheckboxGroupType
}