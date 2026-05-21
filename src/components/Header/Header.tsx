import { HeaderProps } from "./Header.types"
import { title, addLabel } from '../../content/data'

export default function Header(props: HeaderProps) {

  const { 
    handleAddVoice,
    handleStartStop,
    showStart,
    running
  } = props

  return <>
    {title}{" "}
    <br />
    <br />
    <button 
      value={addLabel}
      onClick={handleAddVoice}
    >
      {addLabel}
    </button>
    
    {
      showStart &&
      <button onClick={handleStartStop}>
        {running ? 'Stop' : 'Start'}
      </button>
    }
  </>
}