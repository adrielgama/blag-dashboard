import { ScrollArea } from '../ui/scroll-area'

export const UserProfile = () => {
  return (
    <div className="rounded-md py-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white mb-4">Perfil</h1>
      <ScrollArea>
        <h1>Profile</h1>
      </ScrollArea>
    </div>
  )
}
