import { useEffect, useRef, useState }        from 'react';
import './App.css';
import { waveforms }                          from './content/data'
import Voice                                  from './components/Voice/Voice';
import { VoiceType }                          from './components/Voice/Voice.types'
import Header                                 from './components/Header/Header';
import { setUpVoice, firstInterval, stopOne } from './App.functions';
import { Waveform }                           from './App.types';
import { Synth } from './Synth/Synth';


function App() {

  // state

  const [context] = useState(() => new AudioContext())
  const [voices,  setVoices] = useState<VoiceType[]>([])
  const [running, setRunning] = useState<boolean>(false)

  // refs

  const runningRef = useRef(false)
  const voicesRef = useRef(voices)

  // effect

  useEffect(() => { 

    voicesRef.current = voices
    if (!voices.length) toggleRunning(false)   

  }, [voices])

  // functions

  const handleAddVoice = () => {

    // react component

    const newVoice = setUpVoice(voices[voices.length - 1])
    setVoices(voices => [voices, newVoice].flat())
    

    // synth

    Synth.add(newVoice, running, runningRef, voicesRef)
    
  }

  const handleDelete = (i: number) => {

    // react component
    const voice = voices[i]
    voice.isActive = false
    setVoices(voices => voices.filter((voice, j) => j !== i))

    // synth
    Synth.delete(i)
  }

  const handleStartStop = () => runningRef.current ? stopAll(voices) : start()

  const start = async () => {
    
    // react component
    toggleRunning(true)
    
    // synth
    Synth.start(runningRef, voicesRef)
  }

  const stopAll = (voices: VoiceType[]) => {

    // react component
    toggleRunning(false)

    //synth
    Synth.stop()
  }

  const toggleRunning = (state: boolean) => {
    runningRef.current = state
    setRunning(state)
  }


  return <>
    <br />
    <Header 
      handleStartStop = {handleStartStop}
      running         = {running}
      handleAddVoice  = {handleAddVoice}
      showStart       = {Boolean(voices.length)}
    />

    <br />
    <br />
    {
      voices.map((voice, i) => 
        <div key={i}>
          <Voice
            i             = {i} 
            setVoices     = {setVoices} 
            voices        = {voices}
            handleDelete  = {handleDelete}
            dataAttribute = "Voices"
          />
        </div>
      )
    }
  </>
}

export default App;
