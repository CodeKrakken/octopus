import { images } from "../../content/data"

export default function Button({
  props, 
  label,
  imgPath,
}: {
  props: any
  label: string
  imgPath?: string
}) {

  console.log(imgPath)
  console.log(images)
  
  const imgSrc = images[imgPath!] || ""

  return <>  
    <button   
      {...props}
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