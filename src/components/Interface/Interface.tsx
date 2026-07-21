import { useEffect, useRef, useState }  from 'react';
import Voice                            from '../Voice/Voice';
import { VoiceType }                    from '../Voice/Voice.types'
import Header                           from '../Header/Header';
import { setUpVoice }                   from './Interface.functions';
import { Synth }                        from '../../Synth/Synth';
import { demoVoices }                   from '../../content/data';


function Interface() {

  // state

  const [voices,  setVoices] = useState<VoiceType[]>(demoVoices)
  const [running, setRunning] = useState<boolean>(false)

  // refs

  const runningRef = useRef(running)
  const voicesRef = useRef(voices)

  // effect

  useEffect(() => {
    Synth.resumeContext()
  }, [])
  
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

  const loadVoices = () => {

    const loadedVoices = JSON.parse(localStorage.voices)
    setVoices(loadedVoices)
    Synth.voices = []

    loadedVoices.forEach((voice: VoiceType) => {
      Synth.add(voice, running, voicesRef)
    })
  }


  return <>
    <Header 
      handleStartStop   = {handleStartStop}
      running           = {running}
      handleAddVoice    = {handleAddVoice}
      voices            = {voices}
      loadVoices        = {loadVoices}
    />
    
    <div 
      className="row section" 
      id="voices"
    >
      {
        voices.map((voice, i) => 

          <Voice
            i             = {i} 
            setVoices     = {setVoices} 
            voices        = {voices}
            handleDelete  = {handleDelete}
            dataAttribute = "Voices"
            key           = {voice.id}
          />
        )
      }
    </div>
  </>
}

export default Interface;
