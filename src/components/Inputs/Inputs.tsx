import { buttonGroups, attributes }  from "../../content/data";
import { InputsProps } from "./Inputs.types";
import ButtonGroup               from "../ButtonGroup/ButtonGroup";
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
          Object.keys(buttonGroups).map(buttonGroup =>
            <ButtonGroup 
              groupName={buttonGroup}
              voices={voices}
              i={i}
              setVoices={setVoices}
              key={buttonGroup}
            />
          )
        }
      </div>
    </div>
  </>
}