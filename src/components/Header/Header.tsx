import { title, addLabel } from '../../content/data'
import './Header.css'

export default function Header ({

  handleAddVoice,
  handleStartStop,
  disableStartStop,
  running

} : {

  handleAddVoice    : React.MouseEventHandler<HTMLButtonElement>,
  handleStartStop   : React.MouseEventHandler<HTMLButtonElement>,
  disableStartStop  : Boolean,
  running           : Boolean

}) {
  console.log(disableStartStop)

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
      disabled={disableStartStop as boolean}
    >
      {running ? 'Stop' : 'Start'}
    </button>
    
  </div>
}