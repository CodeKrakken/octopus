import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider, { ReactRangeSliderInputRef } from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
import { useEffect, useRef, useState } from "react";
import "./SingleSlider.css";
    
export default function SingleSlider ({  
  attrName,  
  i,    
  voices,  
  setVoices,
} : {  
  attrName: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,
}) {  
  
  const [val, setVal] = useState(voices[i][attrName as Atom]);
  const sliderRef = useRef<ReactRangeSliderInputRef>(null);  

  useEffect(() => {  
    if (sliderRef.current) {  
      sliderRef.current.thumb.upper.dataset.label = String(val);  
    }  
  }, []);
        
  const handleInput = ([lo, hi]: [number, number]) => {  
    if (sliderRef.current) {  
      sliderRef.current.thumb.lower.dataset.label = `${lo}`;  
      sliderRef.current.thumb.upper.dataset.label = `${hi}`;  
    }
    const updatedVoices = [...voices];  
    updatedVoices[i][attrName as Atom] = hi;  
    setVoices(updatedVoices);
    setVal(hi)    
  }    
  
  return (
    <div className="single slider">    
      <RangeSlider 
        ref={sliderRef}   
        min={0}  
        max={100}  
        value={[0, val]}  
        thumbsDisabled={[true, false]}  
        rangeSlideDisabled={true}  
        onInput={handleInput}  
      />
    </div>
  )
}