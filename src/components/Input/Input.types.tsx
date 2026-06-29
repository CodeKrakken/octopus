import { ChangeEventHandler } from "react"

type ButtonProps = {
  'data-voice'      : number
  'data-attribute'  : string
  type              : string
  value             : string | number
  onChange          : ChangeEventHandler
  checked?          : boolean
  key?              : string
  min?              : number
  max?              : number
}

export type { 
  ButtonProps,
}