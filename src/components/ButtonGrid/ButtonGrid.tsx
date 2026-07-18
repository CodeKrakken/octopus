import Button from "../Button/Button";
import { updateButton } from "../GroupButton/GroupButton.functions";
import { ButtonGroupType, Group } from "../shared.types";
import { VoiceType } from "../Voice/Voice.types";

export default function ButtonGrid({
  group,
  voices,
  i,
  setVoices
} : {  
  group: Group  
  voices: VoiceType[]  
  i: number  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>  
}) {

  const columns =  group.columns || Math.floor(Math.sqrt(group!.boxes.length));  
  const voice = voices[i]

  return <>
    <div className="parent">
      <div
        className={`button-grid ${group!.className}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {
          group!.boxes.map(button => {

            const props = {
              className: `
                key
                ${voice[`active${group!.label as ButtonGroupType}`].includes(button) ? 'active' : ''}
              `,
              'data-attribute': group!.label,
              'data-voice': i,
              value: button,
              checked: voice[`active${group!.label as ButtonGroupType}`].includes(button),
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => updateButton(e, `active${group!.label as ButtonGroupType}`, voices, i, setVoices),
              id: group!.id,
              title: button
            };

            const imgPath = `${group.id}/${button}`

            return (
              <Button
                props={props}
                imgPath={imgPath}
                key={button}
                label={button}
              />
            )       
          })
        }
      </div>
    </div>
  </>
}