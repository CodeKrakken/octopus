import { Synth } from "../Synth/Synth"
import { VoiceType } from "./Voice/Voice.types"

  const updateVoice = (voices: VoiceType[], i: number, setVoices: Function) => {
    const voice = voices[i]
    setVoices([voices.slice(0,i), voice, voices.slice(i+1)].flat())
    Synth.update(voice, i)
  }

  export {
    updateVoice
  }