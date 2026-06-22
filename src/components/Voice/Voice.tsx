import { VoiceProps } from './Voice.types'
import DeleteButton   from '../DeleteButton/DeleteButton'
import Inputs         from '../Inputs/Inputs'

export default function Voice(
  {
    i, 
    voices,  
    handleDelete,
    setVoices,
    dataAttribute
  }: VoiceProps
) {
  
  return (
    <div 
      className="voice" 
      data-voice={i}
      data-attribute={dataAttribute}
    >
      <div className="row">
        <DeleteButton
          handleDelete={handleDelete}
          i={i}
        />

        <Inputs
          i         = {i}
          voices    = {voices}
          setVoices = {setVoices}
        />

      </div>
    </div>
  )
}