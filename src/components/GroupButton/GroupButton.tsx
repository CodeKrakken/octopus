import { useState } from "react";
import { Group, GroupButtonProps } from "../shared.types";

export default function GroupButton({ group, component, voices, i, setVoices }: GroupButtonProps) {  
  const [hidden, setHidden] = useState(true)  
  
  const path = `./images/${group.id}.png`
  
  let imgSrc
   
  try {
    imgSrc = require(`${path}`) || ""
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  const props = {
    className:  "group-button",  
    onClick:  handleClick
  }

  const ComponentToRender = component;  
  
  return <>  
    <button   
      {...props}
    >  
      {imgSrc ? <img alt="" src={imgSrc} width="100%" height="100%" />  
        : <>{group.label}</>}  
    </button>  
  
    {!hidden && ComponentToRender && (  
      <ComponentToRender   
        group={group as Group}  
        voices={voices}  
        i={i}  
        setVoices={setVoices}  
      />  
    )}  
  </>  
}