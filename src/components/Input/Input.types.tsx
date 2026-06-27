import { ChangeEventHandler } from "react"

type CheckboxProps = {
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
  CheckboxProps,
}