import { MouseEventHandler, useEffect, useState } from 'react'
import { title, addLabel } from '../../content/data'
import { VoiceType } from '../Voice/Voice.types'
import './Header.css'

export default function Header ({

  handleAddVoice,
  handleStartStop,
  disableButtons,
  running,
  voices,
  loadVoices

} : {

  handleAddVoice    : React.MouseEventHandler<HTMLButtonElement>,
  handleStartStop   : React.MouseEventHandler<HTMLButtonElement>,
  disableButtons    : Boolean,
  running           : Boolean,
  voices            : VoiceType[],
  loadVoices        : MouseEventHandler<HTMLButtonElement>
}) {

  const [disableLoad, setDisableLoad] = useState(false)

  useEffect(() => {
    console.log('using effect')
    if (localStorage.voices) {
      setDisableLoad(false)
    } else {
      setDisableLoad(true)
    }
  }, [localStorage.voices])

  

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