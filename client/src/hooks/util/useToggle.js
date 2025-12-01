import { useState } from "react"

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue((prev) => !prev)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  return [value, setValue, toggle, setTrue, setFalse]
}
