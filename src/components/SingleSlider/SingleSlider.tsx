import { NumericAttribute, Slider }               from "../shared.types";  
import { VoiceType }                              from "../Voice/Voice.types";  
import RangeSlider, { ReactRangeSliderInputRef }  from 'react-range-slider-input';  
import { useEffect, useRef }                      from "react";
import 'react-range-slider-input/dist/style.css';  
import "./SingleSlider.css";
    
export default function SingleSlider ({  

  slider,  
  i,    
  voices,  
  setVoices,

} : {  

  slider    : Slider
  i         : number 
  voices    : VoiceType[] 
  setVoices : React.Dispatch<React.SetStateAction<VoiceType[]>>

}) {  
  
  const sliderRef = useRef<ReactRangeSliderInputRef>(null);  

  useEffect(() => {  
    sliderRef.current!.thumb.upper.dataset.label = String(value);  
  });
  
  const {min, max, attrName} = slider

  const value = voices[i][attrName as NumericAttribute]
        
  const handleInput = ([lo, hi]: [number, number]) => {  

    const updatedVoices = [...voices];

    updatedVoices[i][attrName as NumericAttribute] = hi;  
    setVoices(updatedVoices);
  }    
  
  
  return (

    <RangeSlider 
      ref                 = {sliderRef}   
      min                 = {min}  
      max                 = {max}  
      value               = {[0, value]}  
      thumbsDisabled      = {[true, false]}  
      rangeSlideDisabled  = {true}  
      onInput             = {handleInput}  
    />
  )
}