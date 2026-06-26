import { VoiceProps } from './Voice.types'
import DeleteButton   from '../DeleteButton/DeleteButton'
import TextField from '../TextField/TextField'
import { checkboxGroups, doubleSliders, singleSliders } from '../../content/data'
import DoubleSlider from '../DoubleSlider/DoubleSlider'
import SingleSlider from '../SingleSlider/SingleSlider'
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup'

export default function Voice(
  {
    i, 
    voices,  
    handleDelete,
    setVoices,
    dataAttribute
  }: VoiceProps
) {
  
  return (
    <div 
      className="voice"
      data-voice={i}
      data-attribute={dataAttribute}
    >

      <div className="row">
        <div className="name box">
          <TextField 
            attrName  = {'label'}
            i         = {i}
            voices    = {voices}
            setVoices = {setVoices}
          />
        </div>

        {
          singleSliders.map(slider => (
            <div className="slider slider-box column">
              <div className="slider-label">{slider.label}</div>
              <div className="row">
                <SingleSlider
                  slider={slider}
                  i={i}
                  voices={voices}
                  setVoices={setVoices}
                />
              </div>
            </div>
          ))
        }

        <div className="delete box">
          <DeleteButton
            handleDelete={handleDelete}
            i={i}
          />
        </div>
      </div>

      {
        [1,2].map(row => 
          <div className="row">
            {
              doubleSliders.filter(slider => slider.row === row).map(slider => (
                <div className="slider slider-box column">
                  <div className="slider-label row">{slider.label}</div>
                  <div className="row">
                    <DoubleSlider 
                      slider={slider}
                      i={i}
                      voices={voices}
                      setVoices={setVoices}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        )
      }

      <div className="checkboxes">
        {
          [1,2,3,4].map(row => 
            <div className="row">
              {
                checkboxGroups.filter(group => group.row === row).map(group =>
                  <div className={`row box ${group.className}`}>
                    <div className="checkbox-label">{group.label}</div>
                    <CheckboxGroup 
                      group={group}
                      voices={voices}
                      i={i}
                      setVoices={setVoices}
                      key={group.label}
                    />
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}