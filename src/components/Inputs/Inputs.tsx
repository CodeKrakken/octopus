import { checkboxGroups, fields }  from "../../content/data";
import { InputsProps } from "./Inputs.types";
import CheckboxGroup               from "../CheckboxGroup/CheckboxGroup";
import Field                       from "../Field/Field"

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
            Object.keys(fields).map(field => 
              <Field
                fieldName={field}
                i={i}
                voices={voices}
                setVoices={setVoices}
              />            
            )
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
              />
            )
          }
        </div>
      </div>
    </div>
  </>
}