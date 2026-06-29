import { ButtonProps } from "../Input/Input.types";
import { updateButton } from "../Inputs/Inputs.functions";
import { ButtonGroupType } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";

type ButtonGroupProps = {
  group: {label: string, boxes: string[]}
  voices: VoiceType[]
  i: number
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
}

export default function ButtonGroup({
  group,
  voices,
  i,
  setVoices
}: ButtonGroupProps) {

  const voice = voices[i]

  return <>
    {
      group.boxes.map(button => {

        const props = {
          className: `
            key
            ${voice[`active${group.label as ButtonGroupType}`].includes(button) ? 'active' : ''}
          `,
          'data-attribute': group.label,
          'data-voice': i,
          value: button,
          checked: voice[`active${group.label as ButtonGroupType}`].includes(button),
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => updateButton(e, `active${group.label as ButtonGroupType}`, voices, i, setVoices),
          key: button
        };

        let imgSrc

        try {
          imgSrc = require(`./images/${button}.png`) || ""

        } catch (error) {
          console.log(error.message)
        }

        return (
          <button {...props} style={{height: "28px", width: "28px"}}>
            <img src={imgSrc} width="100%" height="100%" />
          </button>
        )       
      })
    }
  </>
}