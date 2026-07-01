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

  const handleSave = () => {
    console.log(voices)
    localStorage.voices = JSON.stringify(voices)
  }

  const handleLoad = () => {
    voices = JSON.parse(localStorage.voices)
    console.log(voices)
    setVoices(voices)
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
      onClick={handleLoad}
    >
      {'Load'}
    </button>
  </div>
}