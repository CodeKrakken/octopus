import { VoiceProps } from './Voice.types'
import DeleteButton   from '../DeleteButton/DeleteButton'
import TextField from '../TextField/TextField'
import { buttonGroups, doubleSliders, singleSliders } from '../../content/data'
import DoubleSlider from '../DoubleSlider/DoubleSlider'
import SingleSlider from '../SingleSlider/SingleSlider'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Piano from '../Piano/Piano'

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
      id="voice"
      data-voice={i}
      data-attribute={dataAttribute}
    >
      <div id="sliders">
        <div className="row">
          <div>
            <TextField 
              attrName  = {'label'}
              i         = {i}
              voices    = {voices}
              setVoices = {setVoices}
            />
          </div>

          {
            singleSliders.map(slider => <div>
              <div className="slider-label">{slider.label}</div>
              <div className="single slider">    
                <SingleSlider
                  slider={slider}
                  i={i}
                  voices={voices}
                  setVoices={setVoices}
                />
              </div>
            </div>)
          }

          <div>
            <DeleteButton
              handleDelete={handleDelete}
              i={i}
            />
          </div>
        </div>

        {
          [1, 2].map(row => 
            <div className="row">
              {
                doubleSliders.filter(slider => slider.row === row).map(slider => <div>
                  <div className="slider-label">{slider.label}</div>
                  <div className="slider">
                    <DoubleSlider 
                      slider={slider}
                      i={i}
                      voices={voices}
                      setVoices={setVoices}
                    />
                  </div>
                </div>)
              }
            </div>
          )
        }
      </div>

      <div className="row">
        <Piano 
          voices={voices}
          i={i}
          setVoices={setVoices}
        />
          
        {
          buttonGroups.map(group =>
            <div className="button-group">
              <ButtonGroup 
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
    </div>
  )
}