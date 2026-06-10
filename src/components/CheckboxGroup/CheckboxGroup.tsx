import { checkboxGroups } from "../../content/data";
import { InputProps } from "../Input/Input.types";
import { updateCheckbox } from "../Inputs/Inputs.functions";
import { CheckboxGroupType } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";

type CheckboxGroupProps = {
  groupName: string
  voices: VoiceType[]
  i: number
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
}

export default function CheckboxGroup({
  groupName,
  voices,
  i,
  setVoices
}: CheckboxGroupProps) {

  const voice = voices[i]

  return <>
    <div className="row">
      <div className="label">{groupName}</div>
      {
        checkboxGroups[groupName as CheckboxGroupType].map((checkbox: string) => {

          const props: InputProps = {
            className: 'checkbox',
            'data-attribute': groupName,
            'data-voice': i,
            type: "checkbox",
            value: checkbox,
            checked: voice[`active${groupName as CheckboxGroupType}`].includes(checkbox),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateCheckbox(e, `active${groupName as CheckboxGroupType}`, voices, i, setVoices)
          };

          return <input {...props} />
        })
      }
    </div>
  </>
}