import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { SliderProps } from '../Input/Input.types';

export default function Slider (props: SliderProps) {

  const { min, max, defaultValue } = props

  return <RangeSlider min={min} max={max} defaultValue={defaultValue} />
}