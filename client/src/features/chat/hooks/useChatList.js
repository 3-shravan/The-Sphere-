import { useState } from "react"

export default function useChatList() {
  const [query, setQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
}
