import { useEffect, useState } from 'react'
import { title, addLabel } from '../../content/data'
import { VoiceType } from '../Voice/Voice.types'
import './Header.css'

export default function Header ({

  handleAddVoice,
  handleStartStop,
  disableButtons,
  running,
  voices,
  setVoices

} : {

  handleAddVoice    : React.MouseEventHandler<HTMLButtonElement>,
  handleStartStop   : React.MouseEventHandler<HTMLButtonElement>,
  disableButtons    : Boolean,
  running           : Boolean,
  voices            : VoiceType[],
  setVoices         : React.Dispatch<React.SetStateAction<VoiceType[]>>

}) {

  const [disableLoad, setDisableLoad] = useState(false)

  useEffect(() => {
    loadVoices()
  }, [])

  useEffect(() => {
    console.log('using effect')
    if (localStorage.voices) {
      setDisableLoad(false)
    } else {
      setDisableLoad(true)
    }
  }, [localStorage.voices])

  const loadVoices = () => {

    if (localStorage.voices) {
      voices = JSON.parse(localStorage.voices)
      setVoices(voices)
    }
  }

  const handleSave = () => {
    localStorage.voices = JSON.stringify(voices)
  }

  return <div className="header">
    {title}{" "}
    <button 
      value={addLabel}
      onClick={handleAddVoice}
    >
      {addLabel}
    </button>
        
    <button 
      onClick={handleStartStop}
      disabled={disableButtons as boolean}
    >
      {running ? 'Stop' : 'Start'}
    </button>

    <button
      onClick={handleSave}
      disabled={disableButtons as boolean}
    >
      {'Save'}
    </button>
    <button
      onClick={loadVoices}
      disabled={disableLoad as boolean}
    >
      {'Load'}
    </button>
  </div>
}