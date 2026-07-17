export default function Button({
  props, 
  label,
  imgPath,
  key
}: {
  props: any
  label: string
  imgPath?: string
  key?: string
}) {

  let imgSrc
   
  try {
    imgSrc = require(`${imgPath}`) || ""
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error", error)
  }

  return <>  
    <button   
      {...props}
      key={key}
    >  
      {
        imgSrc ? <img 
          alt="" 
          src={imgSrc} 
          width="100%" 
          height="100%" 
        /> : <>
          {label}
        </>
      }  
    </button>
  </>
}