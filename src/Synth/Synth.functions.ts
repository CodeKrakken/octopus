import { VoiceType }                                              from '../components/Voice/Voice.types'
import { OscGain, VoicesRef }                                     from './Synth.types'
import { allFrequencies, extrema, oneMinute, samples, waveforms } from '../content/data';
import { Range } from '../components/shared.types';

let freqArray: number[] | undefined  

const getContext = (context: AudioContext = new AudioContext()) => {

  if (context.state === 'suspended') { context.resume() }
  
  return context
}

const runInterval = (
  voice: VoiceType, 
  running: boolean, 
  voicesRef: VoicesRef, 
  context: AudioContext
) => {

  if (running) {

    voice.thisInterval = voice.nextInterval
    const thisInterval = voice.thisInterval

    if (isTimeFor(thisInterval, context)) {
      
      const intervalLength = getIntervalLength(voice)
      voice.nextInterval += intervalLength
    
      if (!isRest(voice)) makeSound(voice, intervalLength, voicesRef, context)
    } 

    if (!voice.isActive) return

    setTimeout(() => {
      runInterval(voice, running, voicesRef, context)
    }, (voice.nextInterval - context.currentTime)*1000)    
  }
}

// private functions

const getFreqArray = (): number[] => freqArray ??= [...new Set(allFrequencies.flat())]

const isTimeFor = (timeCode: number, context: AudioContext) => context.currentTime >= timeCode

const getIntervalLength = (voice: VoiceType) => {

  const {activeIntervals, bpm} = voice
  const interval = (randomOneFrom(activeIntervals) || '0') as string
  const intervalLength  = oneMinute / bpm * parseFloat(interval)

  return intervalLength
}

const isRest = (voice: VoiceType) => {

  const restChance  = voice.restChance/100
  const diceRoll = Math.random()
  const result = diceRoll < restChance

  return result
}

const makeSound = (
  voice: VoiceType, 
  intervalLength: number, 
  voicesRef: VoicesRef, 
  context: AudioContext
) => {

  const { activeSounds, thisInterval } = voice

  const offsetTime = getRangeValue('Offset', voice) / 100 * intervalLength

  setTimeout(() => {

    try {
      const randomSound = randomOneFrom(activeSounds) as OscillatorType
      const level = calculateLevel(voice, voicesRef.current)

      if (waveforms.includes(randomSound)) {

        const oscGain = setUpOscillator(context)
        oscGain.oscillator.type = randomSound
        const noteLength = generateNoteLength(voice, intervalLength)
        voice.offsetInterval = thisInterval! + offsetTime

        oscillate(voice, noteLength, level, oscGain)

        setTimeout(() => removeOscillator(oscGain), intervalLength*1000)
      } else {
        playSample(randomSound, level, context)
      }

    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error", error)
    }            
  }, offsetTime*1000)
}

const setUpOscillator = (context: AudioContext) => {

  const oscillator  = context.createOscillator()
  const gain        = context.createGain()

  oscillator.connect(gain);
  gain.gain.setValueAtTime(0, 0)
  gain.connect(context.destination);
  oscillator.start(0);

  return {oscillator, gain}
}

const removeOscillator = (oscGain: OscGain) => {

  const { oscillator, gain } = oscGain

  oscillator.stop()
  oscillator.disconnect()
  gain.disconnect()
}

const playSample = (
  name: string, 
  level: number,
  context: AudioContext
) => {
  const sample = setUpSample(samples[name as keyof typeof samples], context, level)
  sample.play()
}

const oscillate = (
  voice: VoiceType, 
  noteLength: number, 
  level: number, 
  oscGain: OscGain,
) => {
  
  oscGain.oscillator.frequency.value = generateFrequency(voice)

  const gain         = oscGain.gain!.gain
  const thisInterval = voice.offsetInterval!

  const fadeInPercentage  = getRangeValue('FadeIn', voice)
  const fadeOutPercentage = getRangeValue('FadeOut', voice)

  const fadeInLength  = getFadeLength(fadeInPercentage , noteLength)
  const fadeOutLength = getFadeLength(fadeOutPercentage, noteLength)

  const endOfFadeIn    = thisInterval + fadeInLength
  const startOfFadeOut = thisInterval + noteLength - fadeOutLength
  const peakPoint      = thisInterval + noteLength * fadeInPercentage / (fadeInPercentage + fadeOutPercentage)
  const overlap        = endOfFadeIn >= startOfFadeOut
  const startOfPeak    = overlap ? peakPoint : endOfFadeIn
  const endOfPeak      = overlap ? peakPoint : startOfFadeOut

  gain.setValueAtTime(0, thisInterval)
  gain.linearRampToValueAtTime(level, startOfPeak)
  gain.setValueAtTime(level, endOfPeak)
  gain.linearRampToValueAtTime(0, thisInterval + noteLength)
  gain.setValueAtTime(gain.value, 0)  
}

const randomOneFrom = <T>(array: T[]): T => {

  return array[Math.floor(Math.random() * array.length)]
}

const calculateLevel = (voice: VoiceType, voices: VoiceType[]) => {

  const { minLevel, maxLevel } = voice
  const balancedLevel = ((minLevel + Math.random() * (maxLevel - minLevel))/100)/voices.length
  
  return balancedLevel
}

const setUpSample = (
  file: string, 
  context: AudioContext, 
  level: number
) => {

  const sample = new Audio(file)
  const sound = context.createMediaElementSource(sample);
  const gain  = context.createGain()
  
  sound.connect(gain)
  gain.gain.setValueAtTime(level, 0)
  gain.connect(context.destination)

  return sample
}

const generateNoteLength = (voice: VoiceType, intervalLength: number) => {

  const noteLengthPercentage  = getRangeValue('Length', voice)
  const noteLength = intervalLength / 100 * noteLengthPercentage

  return noteLength
}

const getFadeLength = (percentage: number, noteLength: number) => noteLength * percentage / 100

const generateFrequency = (voice: VoiceType) => {

  const randomFrequency = randomOneFrom(getActiveFrequencies(voice) as number[])
  const frequency   = detune(randomFrequency as number, voice)

  return frequency
}

const detune = (frequency: number, voice: VoiceType) => {

  const cents = getRangeValue('Detune', voice)

  if (!cents) return frequency
    
  const modifier = cents < 0 ? -1 : 1
  const nextFreq = getFreqArray()[freqArray!.indexOf(frequency) + modifier]
  const hzDiff = Math.max(nextFreq, frequency) - Math.min(nextFreq, frequency)
  const detunedFrequency = frequency + hzDiff / 100 * cents
  
  return detunedFrequency
}



const getActiveFrequencies = (voice: VoiceType) => {
    
  const { activeOctaves, activeNotes } = voice
  
  let allFrequenciesInOctaves = allFrequencies.filter(
    (octave, j) => activeOctaves.includes(j.toString())
  )
  
  let activeFrequencies = allFrequenciesInOctaves.map(octave =>
    octave.filter((note, j) => activeNotes.includes((j+1).toString()))
  )

  return activeFrequencies.flat(Infinity)
}


const getRangeValue = (key: Range, voice: VoiceType) => {
    
  const [min, max] = extrema.map(prefix => voice[prefix + key as keyof VoiceType])

  const rangeValue = (
    min as number + (Math.random() * (
      max as number - (min as number)
    ))
  )

  return rangeValue
}

export {
  getContext,
  runInterval
}