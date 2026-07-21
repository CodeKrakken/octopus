import { useEffect, useRef } from "react";
import { NumericAttribute, Slider } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider, { ReactRangeSliderInputRef } from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  

export default function DoubleSlider ({  
  
  slider,  
  i,  
  voices,  
  setVoices  

}: {  

  slider    : Slider  
  i         : number  
  voices    : VoiceType[]  
  setVoices : React.Dispatch<React.SetStateAction<VoiceType[]>>

}) {  

  const sliderRef = useRef<ReactRangeSliderInputRef>(null);

  useEffect(() => {     
    sliderRef.current!.thumb.lower.dataset.label = String(rangeValue[0]);  
    sliderRef.current!.thumb.upper.dataset.label = String(rangeValue[1]);  
  });
  
  const {min, max} = slider

  const rangeValue = [
    voices[i][`min${slider.value}` as NumericAttribute], 
    voices[i][`max${slider.value}` as NumericAttribute]
  ] as [number, number]
  
  const handleRangeInput = ([lo, hi]: [number, number]) => {    

    const updatedVoices = [...voices] as VoiceType[];   

    updatedVoices[i][`min${slider.value}` as NumericAttribute] = lo;    
    updatedVoices[i][`max${slider.value}` as NumericAttribute] = hi;    
    setVoices(updatedVoices);    
  };

  const props = {
    ref: sliderRef,
    min: min,  
    max: max,    
    value: rangeValue,  
    onInput: handleRangeInput,
    'data-attribute': slider.key
  }
  
  return <RangeSlider {...props} />   
}