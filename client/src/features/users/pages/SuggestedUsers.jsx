import { useSmoothScroll } from "@eightmay/use-custom-lenis"
import { CircleSmall } from "lucide-react"
import { SmoothScroll } from "@/components"
import { ListUsers } from "../components/ListUsers"
import { useHandleSuggestedUsers } from "../hooks/use-suggested-users"

export default function SuggestedUsers() {
  const { suggestedUsers, followUser, map, setMap } = useHandleSuggestedUsers()
  useSmoothScroll(".scroll")
  return (
    <SmoothScroll className="scroll custom-scrollbar-hide max-h-[300px] md:max-h-[215px]">
      <div className="flex-col gap-2 p-2">
        <h2 className="p-2 px-2.5 pb-4 font-Futura text-second tracking-tight dark:text-first">
          <CircleSmall className="inline text-second" size={27} />
          you may know
        </h2>

        <ListUsers users={suggestedUsers} followUser={followUser} map={map} setMap={setMap} />
      </div>
    </SmoothScroll>
  )
}
