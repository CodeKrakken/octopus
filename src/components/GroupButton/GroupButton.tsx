import { useState } from "react";
import { Group, GroupButtonProps } from "../shared.types";
import { getImgSrc } from "../shared.functions";



export default function GroupButton(props: GroupButtonProps) {  
  const [hidden, setHidden] = useState(true)  
  const { group, component, voices, i, setVoices } = props
  const path = `./content/button-images/${group.id}/${group.id}.png`
  const imgSrc = getImgSrc(path)


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