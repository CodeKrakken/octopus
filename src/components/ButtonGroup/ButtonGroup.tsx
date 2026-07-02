import { useState } from "react";
import { ButtonGroupType } from "../shared.types";
import { Compound, VoiceType } from "../Voice/Voice.types";
import { updateVoice } from "../shared.functions";
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
    imgSrc: string
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
    imgSrc = require(`./images/${group.imgSrc}/${group.imgSrc}.png`) || ""
  } catch (error) {
    // console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  const columns = Math.floor(Math.sqrt(group.boxes.length));  


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
                key: button
              };

              let imgSrc

              try {
                imgSrc = require(`./images/${group.imgSrc}/${button}.png`) || ""

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
      </div>
    }
  </>
}