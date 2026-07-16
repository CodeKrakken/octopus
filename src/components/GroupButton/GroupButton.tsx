import { useState } from "react";
import { Group, GroupButtonProps } from "../shared.types";



export default function GroupButton(props: GroupButtonProps) {  
  const [hidden, setHidden] = useState(true)  
  const { group, component, voices, i, setVoices } = props  
  
  let imgSrc

  try {
    imgSrc = require(`./images/${group!.id}/${group!.id}.png`) || ""
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  const ComponentToRender = component;  
  
  return <>  
    <button   
      className="group-button"  
      onClick={handleClick}  
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