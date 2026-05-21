import { checkboxGroups, fields }  from "../../content/data";
import { InputsProps, InputsType } from "./Inputs.types";
import CheckboxGroup               from "../CheckboxGroup/CheckboxGroup";
import Field                       from "../Field/Field"

export default function Inputs(
  { 
    i,
    voices,
    setVoices
  }: InputsProps) {

  const inputs: InputsType = {
    fields: <>
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
    </>,
    checkboxGroups: <>
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
    </> 
  }

  return <>
    <div 
      className="column"
    >
      {
        Object.keys(inputs).map(input => 
          <div className="row">
            {inputs[input as keyof InputsType]}
          </div>
        )
      }
    </div>
  </>
}