import { VoiceType }                                              from '../components/Voice/Voice.types'
import { OscGain, VoicesRef }                                     from './Synth.types'
import { allFrequencies, extrema, oneMinute, samples, waveforms } from '../content/data';
import { Range } from '../components/shared.types';

const buffers: Record<string, AudioBuffer> = {}  

let samplesLoading = false  
  
const loadSamples = (ctx: AudioContext) => {  
  if (samplesLoading) return  
  samplesLoading = true  
  Promise.all(  
    Object.entries(samples).map(async ([name, url]) => {  
      try {  
        const response = await fetch(url as string)  
        const arrayBuffer = await response.arrayBuffer()  
        buffers[name] = await ctx.decodeAudioData(arrayBuffer)  
      } catch (e) {  
        console.error('Failed to load sample:', name, e)  
      }  
    })  
  )  
}

let freqArray: number[] | undefined  

const getContext = (context: AudioContext = new AudioContext()) => {

  if (context.state === 'suspended') { context.resume() }
  loadSamples(context)
  return context
}

const runInterval = (
  voice: VoiceType, 
  voicesRef: VoicesRef, 
  context: AudioContext
) => {

  voice.thisInterval = voice.nextInterval
  const thisInterval = voice.thisInterval

  if (isTimeFor(thisInterval, context)) {
    
    const intervalLength = getIntervalLength(voice)
    voice.nextInterval += intervalLength
  
    if (!isRest(voice)) makeSound(voice, intervalLength, voicesRef, context)
  } 

  if (!voice.isActive) return

  setTimeout(() => {
    runInterval(voice, voicesRef, context)
  }, (voice.nextInterval - context.currentTime)*1000)    
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
  
  return diceRoll < restChance
}

const makeSound = (
  voice: VoiceType, 
  intervalLength: number, 
  voicesRef: VoicesRef, 
  context: AudioContext
) => {

  const { activeSounds, thisInterval } = voice

  const offsetTime = getRangeValue('Offset', voice) / 100 * intervalLength

  try {
    const randomSound = randomOneFrom(activeSounds) as OscillatorType
    const level = calculateLevel(voice, voicesRef.current)
    voice.offsetInterval = thisInterval! + offsetTime

    if (waveforms.includes(randomSound)) {

      const oscGain = setUpOscillator(context)
      oscGain.oscillator.type = randomSound
      const noteLength = generateNoteLength(voice, intervalLength)
      oscillate(voice, noteLength, level, oscGain)

      setTimeout(() => removeOscillator(oscGain), (intervalLength+offsetTime)*1000)
    } else {
      playSample(randomSound, level, context, voice.offsetInterval, voice)
    }

  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error", error)
  }            
}

const setUpOscillator = (context: AudioContext) => {

  const oscillator  = context.createOscillator()
  const gain        = context.createGain()

  oscillator.connect(gain);
  gain.gain.setValueAtTime(0, 0)
  gain.connect(context.destination);
  oscillator.start(0);

  return {oscillator, gainNode: gain}
}

const removeOscillator = (oscGain: OscGain) => {
  const { oscillator, gainNode } = oscGain

  oscillator.stop()
  oscillator.disconnect()
  gainNode.disconnect()
}
const playSample = (name: string, level: number, context: AudioContext, time: number, voice: VoiceType) => {  
  const buffer = buffers[name]  
  if (!buffer) {  
    console.warn('Buffer not ready for:', name)   // now you'll see if timing is the issue  
    return  
  }  
  const source = context.createBufferSource()  
  source.buffer = buffer  
  const gain = context.createGain()  
  gain.gain.setValueAtTime(level, 0)  
  source.connect(gain)  
  gain.connect(context.destination)

  source.detune.value = ((+randomOneFrom(voice.activeNotes)-1) * 100) // + getRangeValue('Detune', voice)
  source.start(time)  

  source.onended = () => {  
    source.disconnect()  
    gain.disconnect()  
  }
}

const oscillate = (
  voice: VoiceType, 
  noteLength: number, 
  level: number, 
  oscGain: OscGain,
) => {
  oscGain.oscillator.frequency.value = generateFrequency(voice)
  const gain         = oscGain.gainNode.gain
  const thisInterval = voice.offsetInterval!
  const attackPercentage  = getRangeValue('Attack', voice)
  const decayPercentage = getRangeValue('Decay', voice)

  const attackLength  = getFadeLength(attackPercentage , noteLength)
  const decayLength = getFadeLength(decayPercentage, noteLength)

  const endOfAttack    = thisInterval + attackLength
  const startOfDecay  = thisInterval + noteLength - decayLength
  const peakPoint      = thisInterval + noteLength * attackPercentage / (attackPercentage + decayPercentage)
  const overlap        = endOfAttack >= startOfDecay
  const startOfPeak    = overlap ? peakPoint : endOfAttack
  const endOfPeak      = overlap ? peakPoint : startOfDecay

  gain.setValueAtTime(0, thisInterval)
  gain.linearRampToValueAtTime(level, startOfPeak)
  gain.setValueAtTime(level, endOfPeak)
  gain.linearRampToValueAtTime(0, thisInterval + noteLength)
}

const randomOneFrom = <T>(array: T[]): T => {

  return array[Math.floor(Math.random() * array.length)]
}

const calculateLevel = (voice: VoiceType, voices: VoiceType[]) => {

  const { minLevel, maxLevel } = voice
  const balancedLevel = ((minLevel + Math.random() * (maxLevel - minLevel))/100) // /voices.length
  
  return balancedLevel
}


const generateNoteLength = (voice: VoiceType, intervalLength: number) => {

  const noteLengthPercentage  = getRangeValue('Length', voice)

  return intervalLength / 100 * noteLengthPercentage
}

const getFadeLength = (percentage: number, noteLength: number) => noteLength * percentage / 100

const generateFrequency = (voice: VoiceType) => {

  const randomFrequency = randomOneFrom(voice.activeFrequencies)

  return detune(randomFrequency as number, voice)
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