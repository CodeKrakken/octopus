import { checkboxGroups, extrema, fields }  from "../../content/data";
import { InputsProps, InputsType }          from "./Inputs.types";
import { Atom, CheckboxGroup }              from "../shared.types";
import Input                                from "../Input/Input";
import { updateCheckbox, updateField }      from "./Inputs.functions";
import { InputProps }                       from "../Input/Input.types";
import Field                                from "../Field/Field"

const input = ((props: InputProps) => <Input {...props} />)

export default function Inputs(
  { 
    i,
    voices,
    setVoices
  }: InputsProps) {

  const voice = voices[i]

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
            <>
              <div className="row">
                <div className="label">{checkboxGroup}</div>
                {
                  checkboxGroups[checkboxGroup as CheckboxGroup].map((checkbox: string) => {

                    console.log(checkboxGroup)

                    const props: InputProps = {
                      className: 'checkbox',
                      'data-attribute': checkboxGroup,
                      'data-voice': i,
                      type: "checkbox",
                      value: checkbox,
                      checked: voice[`active${checkboxGroup as CheckboxGroup}`].includes(checkbox),
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateCheckbox(e, `active${checkboxGroup as CheckboxGroup}`, voices, i, setVoices)
                    };

                    return input(props)
                  })
                }
              </div>
            </>
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