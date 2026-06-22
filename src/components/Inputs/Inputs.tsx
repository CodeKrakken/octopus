import { checkboxGroups, attributes }  from "../../content/data";
import { InputsProps } from "./Inputs.types";
import CheckboxGroup               from "../CheckboxGroup/CheckboxGroup";
import "./Inputs.css";
import Input from "../Input/Input";

export default function Inputs(
  { 
    i,
    voices,
    setVoices
  }: InputsProps) {

  return <>
    <div className="row">
      <div className="column">
        {
          Object.keys(attributes).map(attrName => (
            <Input 
              attrName={attrName}
              i={i}
              voices={voices}
              setVoices={setVoices}
            />
          ))
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
  </>
}