import { updateButton } from "../GroupButton/GroupButton.functions";
import { getImgSrc } from "../shared.functions";
import { ButtonGridProps, ButtonGroupType, Group } from "../shared.types";

export default function ButtonGrid({
  group,
  voices,
  i,
  setVoices
}: ButtonGridProps) {

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

            const path = `src/content/button-images/${group.id}/${button}.png`
            const imgSrc = getImgSrc(path)
            return (
              <button {...props} key={button}>
                {
                  imgSrc ? <img src={imgSrc} alt="" width="100%" height="100%" />
                  : <>{button}</>
                }
              </button>
            )       
          })
        }
      </div>
    </div>
  </>
}