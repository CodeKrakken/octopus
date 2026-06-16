import { checkboxGroups, attributes }  from "../../content/data";
import { InputsProps } from "./Inputs.types";
import CheckboxGroup               from "../CheckboxGroup/CheckboxGroup";
import SingleSlider from "../SingleSlider/SingleSlider";
import "./Inputs.css";
import Field from "../Field/Field";
import { Atom } from "../shared.types";
import DoubleSlider from "../DoubleSlider/DoubleSlider";

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
                  <DoubleSlider
                    defaultValue={[0, 100]}
                    fieldName={attr}
                    i={i}
                    voices={voices}
                    setVoices={setVoices}
                    key={attr}      
                  />
                    :
                  attributes[attr as keyof typeof attributes].inputType === 'singleValueSlider'
                    ?
                  <SingleSlider
                    thumbsDisabled={[true, false]}
                    attr={attr}
                    i={i}
                    voices={voices}
                    setVoices={setVoices}
                    key={attr}
                  />
                    :
                  attributes[attr as keyof typeof attributes].inputType === 'textbox'
                    ?
                  <Field
                    fieldName={attr}
                    i={i}
                    voices={voices}
                    setVoices={setVoices}
                    key={attr}
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