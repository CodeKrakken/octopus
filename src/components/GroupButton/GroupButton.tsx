import { useState } from "react";
import { ButtonGroupProps, ButtonGroupType, Group } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";
import { updateButton } from "./GroupButton.functions";
import ButtonGrid from "../ButtonGrid/ButtonGrid";


export default function GroupButton({
  group,
  voices,
  i,
  setVoices,
  component
} : ButtonGroupProps) {

  const [hidden, setHidden] = useState(true)

  const voice = voices[i]

  let imgSrc

  try {
    imgSrc = require(`./images/${group.id}/${group.id}.png`) || ""
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  const ComponentToRender = component!;  

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
      <ComponentToRender 
        group={group} 
        voices={voices} 
        i={i} 
        setVoices={setVoices} 
      />
    }
  </>
}