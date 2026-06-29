import { CheckboxProps } from "../Input/Input.types";
import { updateCheckbox } from "../Inputs/Inputs.functions";
import { CheckboxGroupType } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";

type CheckboxGroupProps = {
  group: {label: string, boxes: string[]}
  voices: VoiceType[]
  i: number
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>
}

export default function CheckboxGroup({
  group,
  voices,
  i,
  setVoices
}: CheckboxGroupProps) {

  const voice = voices[i]

  return <>
    {
      group.boxes.map(checkbox => {

        const props: CheckboxProps = {
          'data-attribute': group.label,
          'data-voice': i,
          type: "checkbox",
          value: checkbox,
          checked: voice[`active${group.label as CheckboxGroupType}`].includes(checkbox),
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateCheckbox(e, `active${group.label as CheckboxGroupType}`, voices, i, setVoices),
          key: checkbox
        };

        return <input {...props} />
      })
    }
  </>
}