import { updateButton } from "../Inputs/Inputs.functions";
import { VoiceType } from "../Voice/Voice.types";
import './Piano.css';

export default function Piano ({
  voices,
  i,
  setVoices
} : {
  voices: VoiceType[]
  i: number,
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
}) {

  const voice = voices[i]

  const whiteKeys = ['1', '3', '5', '6', '8', '10', '12', '13']
  const blackKeys = ['2', '4', '7', '9', '11']

  const keys = [
    ...whiteKeys, 
    ...blackKeys
  ].sort((a, b) => +a - +b)
  
  return (
    <div className="keyboard">
      {
        keys.map(note => {
          const props = {
            className: `
              key
              ${blackKeys.includes(note) ? 'black' : 'white'}
              ${voice.activeNotes.includes(note) ? 'active' : ''}
            `,
            'data-attribute': 'Notes',
            'data-voice': i,
            value: note,
            checked: voice.activeNotes.includes(note),
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => updateButton(e, 'activeNotes', voices, i, setVoices),
            key: note
          };

          return <button {...props} />
        })
      }
    </div>
  )
}
