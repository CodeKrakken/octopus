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

type Compound = 
  'activeNotes'
| 'activeOctaves'
| 'activeIntervals'
| 'activeSounds'

export type {
  VoiceType,
  Compound
}