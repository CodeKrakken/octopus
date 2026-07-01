import { useEffect, useRef, useState }  from 'react';
import Voice                            from '../Voice/Voice';
import { VoiceType }                    from '../Voice/Voice.types'
import Header                           from '../Header/Header';
import { setUpVoice }                   from './Interface.functions';
import { Synth }                        from '../../Synth/Synth';


function Interface() {

  // state

  const [voices,  setVoices] = useState<VoiceType[]>([])
  const [running, setRunning] = useState<boolean>(false)

  // refs

  const runningRef = useRef(running)
  const voicesRef = useRef(voices)

  // effect

  useEffect(() => { 

    voicesRef.current = voices
    if (!voices.length) toggleRunning(false)   

  }, [voices])

  // functions

  const handleAddVoice = () => {
    const newVoice = setUpVoice(voices)
    setVoices(voices => [voices, newVoice].flat())
    Synth.add(newVoice, running, voicesRef)
  }

  const handleDelete = (i: number) => {
    const voice = voices[i]
    voice.isActive = false
    setVoices(voices => voices.filter((voice, j) => j !== i))
    Synth.delete(i)
  }

  const handleStartStop = () => running ? stopAll() : start()

  const start = () => {
    toggleRunning(true)
    Synth.start(voicesRef)
  }

  const stopAll = () => {
    toggleRunning(false)
    Synth.stop()
  }

  const toggleRunning = (state: boolean) => {
    runningRef.current = state
    setRunning(state)
  }

  const disableButtons = Boolean(voices.length === 0)

  return <>
    <br />
    <Header 
      handleStartStop   = {handleStartStop}
      running           = {running}
      handleAddVoice    = {handleAddVoice}
      disableButtons    = {disableButtons}
      voices            = {voices}
      setVoices         = {setVoices}
    />
    <div className="row">
      {
        voices.map((voice) => (
          <div key = {voice.id}>
            <Voice
              i             = {voices.indexOf(voice)} 
              setVoices     = {setVoices} 
              voices        = {voices}
              handleDelete  = {handleDelete}
              dataAttribute = "Voices"
            />
          </div>
        ))
      }
    </div>
  </>
}

export default Interface;
