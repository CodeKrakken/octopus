import { checkboxGroups, attributes }  from "../../content/data";
import { InputsProps } from "./Inputs.types";
import CheckboxGroup               from "../CheckboxGroup/CheckboxGroup";
import Slider from "../Slider/Slider";
import "./Inputs.css";
import Field from "../Field/Field";

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
            Object.keys(attributes).map(attr => <div className="row">
              <div className="label">{attributes[attr as keyof typeof attributes].label}</div>
                {  
                  attributes[attr as keyof typeof attributes].inputType === 'rangeSlider' 
                    ?
                  <Slider
                    defaultValue={[0, 100]}
                    attr={attr}
                    i={i}
                    voices={voices}
                    setVoices={setVoices}
                    key={attr}
                  />
                    :
                  attributes[attr as keyof typeof attributes].inputType === 'singleValueSlider'
                    ?
                  <Slider
                    defaultValue={[0, 50]}
                    attr={attr}
                    i={i}
                    voices={voices}
                    setVoices={setVoices}
                    key={attr}
                  />
                    :
                  attributes[attr as keyof typeof attributes].inputType === 'textField'
                    ?
                  <Field
                    fieldName="Name"
                    i={0}
                    voices={voices}
                    setVoices={setVoices}
                  />
                    :
                  <></>
                }
            </div>)
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