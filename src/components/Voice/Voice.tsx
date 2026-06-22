import { VoiceProps } from './Voice.types'
import DeleteButton   from '../DeleteButton/DeleteButton'
import TextField from '../TextField/TextField'
import { doubleSliders, singleSliders } from '../../content/data'
import Input from '../Input/Input'

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

        {
          Object.keys(singleSliders).map(attrName => (
            <Input 
              attrName={attrName}
              i={i}
              voices={voices}
              setVoices={setVoices}
            />
          ))
        }
      </div>

      <div className="row">
        <div className="column">
          {
            Object.keys(doubleSliders).map(attrName => (
              <Input 
                attrName={attrName}
                i={i}
                voices={voices}
                setVoices={setVoices}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}