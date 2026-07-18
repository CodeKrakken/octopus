import { useState } from "react";
import { Group, GroupButtonProps } from "../shared.types";
import Button from "../Button/Button";

export default function GroupButton({ group, component, voices, i, setVoices }: GroupButtonProps) {  
  const [hidden, setHidden] = useState(true)  
  
  const imgPath = `${group.id}`
  
  const handleClick = () => {
    setHidden((prev) => !prev)
  }

  const props = {
    className:  "group-button",  
    onClick:  handleClick
  }

  const ComponentToRender = component;  
  
  return <>  

    <Button
      props={props}
      label={group.label}
      imgPath={imgPath}
    />
      
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