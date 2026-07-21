import { MouseEventHandler, useEffect, useState } from 'react'
import { title, addLabel }                        from '../../content/data'
import { VoiceType }                              from '../Voice/Voice.types'

export default function Header ({

  handleAddVoice,
  handleStartStop,
  disableButtons,
  running,
  voices,
  loadVoices

} : {

  handleAddVoice  : React.MouseEventHandler<HTMLButtonElement>
  handleStartStop : React.MouseEventHandler<HTMLButtonElement>
  disableButtons  : Boolean
  running         : Boolean
  voices          : VoiceType[]
  loadVoices      : MouseEventHandler<HTMLButtonElement>
}) {

  const [disableLoad, setDisableLoad] = useState(false)

  useEffect(() => { setDisableLoad(localStorage.voices ? false : true) }, [])

  const letterImages = (string: string, height: string = "40px") => {

    const letterArray = string.split('').map((letter, i) => 

      /^[A-Z0-9]*$/.test(letter.toUpperCase()) ? (
        <img 
          alt     = "" 
          src     = {require(`../../content/letter-images/${letter.toUpperCase()}.png`)} 
          height  = {height} 
          key     = {`${letter}-${i}`} 
        />
      )
        : 
      letter
    )

    return <div className="centred">{letterArray.map(letter => letter)}</div>
  }

  const handleSave = () => {
    setDisableLoad(false)
    localStorage.voices = JSON.stringify(voices)
  }

  const buttonLabelHeight = "20px"

  return (
    <div 
      className="column" 
      id="header"
    >
      <div id="title">
        {letterImages(title, '50px')}
      </div>

      <div className="centred section">

        <button 
          onClick={handleStartStop}
          disabled={disableButtons as boolean}
          className="header-button"

        >
          {letterImages(running ? 'Stop' : 'Start', buttonLabelHeight)}
        </button>
        
        <button 
          value={addLabel}
          onClick={handleAddVoice}
          className="header-button"
        >
          {letterImages('Add', buttonLabelHeight)}
        </button>            

        <button
          onClick={handleSave}
          disabled={disableButtons as boolean}
          className="header-button"
        >
          {letterImages('Save', buttonLabelHeight)}
        </button>
        <button
          onClick={loadVoices}
          disabled={disableLoad as boolean}
          className="header-button"
        >
          {letterImages('Load', buttonLabelHeight)}
        </button>
      </div>
    </div>
  )
}