import { VoiceProps } from './Voice.types'
import DeleteButton   from '../DeleteButton/DeleteButton'
import TextField from '../TextField/TextField'
import { buttonGroups, piano, doubleSliders, singleSliders } from '../../content/data'
import DoubleSlider from '../DoubleSlider/DoubleSlider'
import SingleSlider from '../SingleSlider/SingleSlider'
import GroupButton from '../GroupButton/GroupButton'
import Piano from '../Piano/Piano'
import ButtonGrid from '../ButtonGrid/ButtonGrid'

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
        <div className="justified row">
          <div>
            <TextField 
              attrName  = {'label'}
              i         = {i}
              voices    = {voices}
              setVoices = {setVoices}
            />
          </div>

          <div>
            <DeleteButton
              handleDelete={handleDelete}
              i={i}
            />
          </div>
        </div>

        <div className="row">
          {
            singleSliders.map(slider => <div key={slider.key}>
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
        </div>
        

        {
          [1, 2, 3].map(row => 
            <div className="row" key={row}>
              {
                doubleSliders.filter(slider => slider.row === row).map(slider => <div key={slider.key}>
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

      <div className="centred row">
        <GroupButton
          group={piano}
          voices={voices}
          i={i}
          setVoices={setVoices}
          key={`piano ${i}`}
          component={Piano}
        />

        {
          buttonGroups.map(group =>
            <GroupButton 
              group={group}
              voices={voices}
              i={i}
              setVoices={setVoices}
              key={group.label}
              component={ButtonGrid}
            />
          )
        }
      </div>
    </div>
  )
}