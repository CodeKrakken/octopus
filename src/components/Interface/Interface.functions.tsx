import { VoiceType } from "../Voice/Voice.types"

const setUpVoice = (voices: VoiceType[]) => {

  let template: VoiceType | null = null
  
  if (voices.length) {
    template = voices[voices.length - 1]
  }
  
  return {
    id              : crypto.randomUUID(),
    isActive        : false,
    label           : generateNewLabel(template, voices),
    nextInterval    : template?.nextInterval    ||  0,
    bpm             : template?.bpm             ??  60,
    minLevel        : template?.minLevel        ??  100,
    maxLevel        : template?.maxLevel        ??  100,
    activeNotes     : template?.activeNotes     ??  ['1','3','5','6','8','10','12','13'],
    activeOctaves   : template?.activeOctaves   ??  ['4'],
    activeIntervals : template?.activeIntervals ??  ['1'],
    activeSounds    : template?.activeSounds    ??  ['sine'],
    restChance      : template?.restChance      ??  0,
    minLength       : template?.minLength       ??  100,
    maxLength       : template?.maxLength       ??  100,
    minOffset       : template?.minOffset       ??  0,  
    maxOffset       : template?.maxOffset       ??  0,
    minDetune       : template?.minDetune       ??  0,
    maxDetune       : template?.maxDetune       ??  0,
    minFadeIn       : template?.minFadeIn       ??  100,
    maxFadeIn       : template?.maxFadeIn       ??  100,
    minFadeOut      : template?.minFadeOut      ??  100,
    maxFadeOut      : template?.maxFadeOut      ??  100
  }
}

const generateNewLabel = (template: VoiceType | null, voices: VoiceType[]) => {

  console.log(template?.label)
  
  let newLabel: string

  if (!template) newLabel = '1'

  if (template?.label && +template.label) {
    newLabel = String(+template.label+1)
  } else {
    newLabel = String(
      voices.map(voice => +voice.label).filter(
        label => !Number.isNaN(label)
      ).sort((a, b) => b - a)[0] + 1
    )
  }

  return newLabel
}

export { 
  setUpVoice
}