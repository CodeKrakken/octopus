import { useState } from "react";
import { ButtonGroupType } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";
import { updateButton } from "./ButtonGroup.functions";


export default function ButtonGroup({
  group,
  voices,
  i,
  setVoices
} : {
  group: {
    label: string
    boxes: string[]
    id: string
    className: string
  }
  voices: VoiceType[]
  i: number
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
}) {

  const [hidden, setHidden] = useState(true)

  const voice = voices[i]

  let imgSrc

  try {
    imgSrc = require(`./images/${group.id}/${group.id}.png`) || ""
  } catch (error) {
    // console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  const columns = Math.floor(Math.sqrt(group.boxes.length));  


  return <>

    <button 
      className="group-button"
      onClick={handleClick}
    >
      {
        imgSrc ? <img alt="" src={imgSrc} width="100%" height="100%" />
        : <>{group.label}</>
      }
    </button>

    {
      hidden ? <></>
        :
      <div className="parent">

        <div
          className={`button-grid ${group.className}`}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
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
              };

              let imgSrc

              try {
                imgSrc = require(`./images/${group.id}/${button}.png`) || ""

              } catch (error) {
                console.error(error instanceof Error ? error.message : "Unknown error", error)
              }

              return (
                <button {...props} key={button} id={group.id}>
                  {
                    imgSrc ? <img src={imgSrc} alt="" width="100%" height="100%" />
                    : <>{button}</>
                  }
                </button>
              )       
            })
            
          }
        </div>
      </div>
    }
  </>
}