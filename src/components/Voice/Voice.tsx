import { VoiceType, Slider }      from '../shared.types'
import TextField                  from '../TextField/TextField'
import { buttonGroups, sliders }  from '../../content/data'
import DoubleSlider               from '../DoubleSlider/DoubleSlider'
import SingleSlider               from '../SingleSlider/SingleSlider'
import GroupButton                from '../GroupButton/GroupButton'
import Button                     from '../Button/Button'

export default function Voice({

    i, 
    voices,  
    handleDelete,
    setVoices,
    dataAttribute

  } : {

    i             : number, 
    setVoices     : React.Dispatch<React.SetStateAction<VoiceType[]>>, 
    voices        : VoiceType[], 
    handleDelete  : Function
    dataAttribute : string

  }) {

  const deleteButtonProps = {
    props: { onClick: () => handleDelete(i) },
    label: "X"
  }

  const sliderRows = Array.from(new Set(sliders.map(slider => slider.row)))
  
  return (
    <div 
      id="voice"
      data-voice={i}
      data-attribute={dataAttribute}
    >
      <div id="sliders">
        <div className="justified row">

          <TextField 
            attrName  = {'label'}
            i         = {i}
            voices    = {voices}
            setVoices = {setVoices}
          />

          <Button {...deleteButtonProps} />
          
        </div>
        
        {
          sliderRows.map(row => 
            <div className="row" key={row}>
              {
                sliders.filter(slider => slider.row === row).map((slider: Slider) => {
                  
                  const Component = slider.className === 'single' ? SingleSlider : DoubleSlider
                  return (
                    <div key={slider.attrName}>
                      <div className="slider-label">{slider.label}</div>
                      <div className={`${slider.className} slider`}>
                        <Component 
                          slider={slider}
                          i={i}
                          voices={voices}
                          setVoices={setVoices}
                        />
                      </div>
                    </div>
                  )}
                )
              }
            </div>
          )
        }
      </div>

      <div className="centred row">
        {
          buttonGroups.map(group =>
            <GroupButton 
              group={group}
              voices={voices}
              i={i}
              setVoices={setVoices}
              key={group.label}
              component={group.component}
            />
          )
        }
      </div>
    </div>
  )
}