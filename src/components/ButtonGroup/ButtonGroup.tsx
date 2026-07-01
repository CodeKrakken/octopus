import { useState } from "react";
import { ButtonProps } from "../Input/Input.types";
import { updateButton } from "../Inputs/Inputs.functions";
import { ButtonGroupType } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";

type ButtonGroupProps = {
  group: {
    label: string
    boxes: string[]
    row: number
    className: string
  }
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

  const [hidden, setHidden] = useState(true)

  const voice = voices[i]

  let imgSrc

  try {
    imgSrc = require(`./images/${group.className}/${group.className}.png`) || ""
  } catch (error) {
    // console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  return <>

    <button 
      style={{height: "56px", width: "56px"}}
      onClick={handleClick}
    >
      {
        imgSrc ? <img src={imgSrc} width="100%" height="100%" />
        : <>{group.label}</>
      }
    </button>

    {
      hidden ? <></>
        :
      <div className="column">
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
              imgSrc = require(`./images/${group.className}/${button}.png`) || ""

            } catch (error) {
              // console.error(error instanceof Error ? error.message : "Unknown error", error)
            }

            return (
              <button {...props} style={{height: "28px", width: "28px"}}>
                {
                  imgSrc ? <img src={imgSrc} width="100%" height="100%" />
                  : <>{button}</>
                }
              </button>
            )       
          })
        }
      </div>
    }
  </>
}