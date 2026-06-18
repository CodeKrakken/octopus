import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider, { ReactRangeSliderInputRef } from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
import { useEffect, useRef } from "react";
import "./SingleSlider.css";
import { singleSliders } from "../../content/data";
    
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
  
  const value = voices[i][attrName as Atom]
  const sliderRef = useRef<ReactRangeSliderInputRef>(null);  

  useEffect(() => {  
    if (sliderRef.current) {  
      sliderRef.current.thumb.upper.dataset.label = String(value);  
    }  
  });

  const {min, max} = singleSliders[attrName as keyof typeof singleSliders]
        
  const handleInput = ([lo, hi]: [number, number]) => {  

    if (sliderRef.current) {  
      sliderRef.current.thumb.lower.dataset.label = lo.toString();  
      sliderRef.current.thumb.upper.dataset.label = hi.toString();  
    }

    const updatedVoices = [...voices];

    updatedVoices[i][attrName as Atom] = hi;  
    setVoices(updatedVoices);
  }    
  
  return (
    <div className="single slider">    
      <RangeSlider 
        ref={sliderRef}   
        min={min}  
        max={max}  
        value={[0, value]}  
        thumbsDisabled={[true, false]}  
        rangeSlideDisabled={true}  
        onInput={handleInput}  
      />
    </div>
  )
}