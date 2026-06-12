import { checkboxGroups, fields }  from "../../content/data";
import { InputsProps } from "./Inputs.types";
import CheckboxGroup               from "../CheckboxGroup/CheckboxGroup";
import Slider from "../Slider/Slider";

export default function Inputs(
  { 
    i,
    voices,
    setVoices
  }: InputsProps) {

  return <>
    <div className="column">
      <div className="row">
        <div className="column">
          {
            Object.keys(fields).map(field => {
              console.log(field)
              return <Slider
                defaultValue={[0, 100]}
                // min={field.min}
              // <Field
              //   fieldName={field}
              //   i={i}
              //   voices={voices}
              //   setVoices={setVoices}
              //   key={field}
              // />       
              />     
            })
          }
        </div>
      </div>
      <div className="row">
        <div className="column">
          {
            Object.keys(checkboxGroups).map(checkboxGroup =>
              <CheckboxGroup 
                groupName={checkboxGroup}
                voices={voices}
                i={i}
                setVoices={setVoices}
                key={checkboxGroup}
              />
            )
          }
        </div>
      </div>
    </div>
  </>
}