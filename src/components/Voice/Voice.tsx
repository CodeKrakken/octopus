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
<div className="voice">

  <div className="row">
    <div className="label">
      <TextField 
        attrName  = {'label'}
        i         = {i}
        voices    = {voices}
        setVoices = {setVoices}
      />
    </div>

    <div className="slider">
      Single slider
      <br />
      BPM
    </div>

    <div className="slider">
      Single slider
      <br />
      Rest
    </div>

    <div className="delete">
      X
    </div>
  </div>


  <div className="row">
    <div className="slider">
      Double slider
      <br />
      Length
    </div>

    <div className="slider">
      Double slider
      <br />
      Offset
    </div>

    <div className="slider">
      Double slider
      <br />
      Detune
    </div>
  </div>


  <div className="row">
    <div className="slider">
      Double slider
      <br />
      Level
    </div>

    <div className="slider">
      Double slider
      <br />
      Attack
    </div>

    <div className="slider">
      Double slider
      <br />
      Decay
    </div>
  </div>


  <div className="notes">
    Notes
  </div>

  <div className="octaves">
    Octaves
  </div>


  <div className="bottom">

    <div className="sounds">
      Sounds
    </div>

    <div className="intervals">
      Intervals
    </div>

  </div>

</div>
    // <div 
    //   className="voice" 
    //   data-voice={i}
    //   data-attribute={dataAttribute}
    // >
    //   <div className="row">
    //     <DeleteButton
    //       handleDelete={handleDelete}
    //       i={i}
    //     />

    //     <TextField 
    //       attrName  = {'label'}
    //       i         = {i}
    //       voices    = {voices}
    //       setVoices = {setVoices}
    //     />

    //     {
    //       Object.keys(singleSliders).map(attrName => (
    //         <Input 
    //           attrName={attrName}
    //           i={i}
    //           voices={voices}
    //           setVoices={setVoices}
    //         />
    //       ))
    //     }
    //   </div>

    //   <div className="row">
    //     <div className="column">
    //       {
    //         Object.keys(doubleSliders).map(attrName => (
    //           <Input 
    //             attrName={attrName}
    //             i={i}
    //             voices={voices}
    //             setVoices={setVoices}
    //           />
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>
  )
}