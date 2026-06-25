import { useEffect, useRef } from "react";
import { attributes } from "../../content/data";  
import { NumericAttribute } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider, { ReactRangeSliderInputRef } from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
import { doubleSliders } from "../../content/data";

export default function DoubleSlider ({  
  
  attrName,  
  i,  
  voices,  
  setVoices  

}: {  

  attrName: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,

}) {  

  const sliderRef = useRef<ReactRangeSliderInputRef>(null);

  useEffect(() => {     
    sliderRef.current!.thumb.lower.dataset.label = String(rangeValue[0]);  
    sliderRef.current!.thumb.upper.dataset.label = String(rangeValue[1]);  
  });
  
  const {min, max} = doubleSliders[attrName as keyof typeof doubleSliders]
  const attr = attributes[attrName as keyof typeof attributes]  

  const rangeValue = [
    voices[i][`min${attr.value}` as NumericAttribute], 
    voices[i][`max${attr.value}` as NumericAttribute]
  ] as [number, number]
  
  const handleRangeInput = ([lo, hi]: [number, number]) => {    
    
    sliderRef.current!.thumb.lower.dataset.label = String(lo);  
    sliderRef.current!.thumb.upper.dataset.label = String(hi);  
    
    const updatedVoices = [...voices] as VoiceType[];   

    updatedVoices[i][`min${attr.value}` as NumericAttribute] = lo;    
    updatedVoices[i][`max${attr.value}` as NumericAttribute] = hi;    
    setVoices(updatedVoices);    
  };

  const props = {
    ref: sliderRef,
    min: min,  
    max: max,    
    value: rangeValue,  
    onInput: handleRangeInput,
    'data-attribute': attrName
  }
  
  return (  
    <div className="slider">
      <RangeSlider {...props} />   
    </div>  
  )  
}