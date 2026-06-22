import { VoiceProps } from './Voice.types'
import DeleteButton   from '../DeleteButton/DeleteButton'
import Inputs         from '../Inputs/Inputs'
import TextField from '../TextField/TextField'

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

        <TextField 
          attrName  = {'label'}
          i         = {i}
          voices    = {voices}
          setVoices = {setVoices}
        />
      </div>
      
      <div className="row">
        <Inputs
          i         = {i}
          voices    = {voices}
          setVoices = {setVoices}
        />
      </div>
    </div>
  )
}