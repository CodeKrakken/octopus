import { NumericAttribute } from "../shared.types";  
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
  setVoices

} : {  

  attrName: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>

}) {  
  
  const sliderRef = useRef<ReactRangeSliderInputRef>(null);  

  useEffect(() => {  
    sliderRef.current!.thumb.upper.dataset.label = String(value);  
  });
  
  const {min, max} = singleSliders[attrName as keyof typeof singleSliders]
  const value = voices[i][attrName as NumericAttribute]
        
  const handleInput = ([lo, hi]: [number, number]) => {  

    sliderRef.current!.thumb.upper.dataset.label = hi.toString();  

    const updatedVoices = [...voices];

    updatedVoices[i][attrName as NumericAttribute] = hi;  
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