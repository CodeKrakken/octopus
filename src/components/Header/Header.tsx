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
    if (localStorage.voices) {
      setDisableLoad(false)
    } else {
      setDisableLoad(true)
    }
  }, [])

  const font = (string: string, height: string = "40px") => {

    const imageArray = string.split('').map(letter => 
      /^[A-Z0-9]*$/.test(letter.toUpperCase()) ? <img alt="" src={require(`../../content/font-images/${letter.toUpperCase()}.png`)} height={height} />  : letter
    )

    return <div className="centred">{imageArray.map(image => image)}</div>
  }

  const handleSave = () => {
    localStorage.voices = JSON.stringify(voices)
  }

  const buttonLabelHeight = "20px"

  return (
    <div className="column" id="header">
      <div id="title">
        {font(title, '50px')}
      </div>
      <div className="centred section">

        <button 
          onClick={handleStartStop}
          disabled={disableButtons as boolean}
          className="header-button"

        >
          {font(running ? 'Stop' : 'Start', buttonLabelHeight)}
        </button>
        
        <button 
          value={addLabel}
          onClick={handleAddVoice}
          className="header-button"
        >
          {font('Add', buttonLabelHeight)}
        </button>            

        <button
          onClick={handleSave}
          disabled={disableButtons as boolean}
          className="header-button"
        >
          <div style={{"margin": "auto auto;"}}></div>
          {font('Save', buttonLabelHeight)}
        </button>
        <button
          onClick={loadVoices}
          disabled={disableLoad as boolean}
          className="header-button"
        >
          {font('Load', buttonLabelHeight)}
        </button>
      </div>
    </div>
  )
}