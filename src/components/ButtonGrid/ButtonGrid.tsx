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

  const { boxes, className, label, id} = group
  const columns =  group.columns || Math.floor(Math.sqrt(boxes.length));  
  const voice = voices[i]

  return <>
    <div className="parent">
      <div
        className={`button-grid ${className}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {
          boxes.map(button => {

            const props = {
              className: `
                key
                ${voice[`active${label as ButtonGroupType}`].includes(button) ? 'active' : ''}
              `,
              'data-attribute': label,
              'data-voice': i,
              value: button,
              checked: voice[`active${label as ButtonGroupType}`].includes(button),
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => updateButton(e, `active${label as ButtonGroupType}`, voices, i, setVoices),
              id: id,
              title: button
            };

            const imgPath = `${id}/${button}`

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