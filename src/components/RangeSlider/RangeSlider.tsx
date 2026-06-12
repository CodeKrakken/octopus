import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function ({
  min,
  max
}: { min: number, max: number }) {

  return <RangeSlider min={min} max={max} />
}