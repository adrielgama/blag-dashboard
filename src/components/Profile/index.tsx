import { useAuthContext } from '@/context/AuthContext'
import { IUserUpdate } from '@/types'

import { ProfileForm } from './ProfileForm'
import { ScrollArea } from '../ui/scroll-area'

export const UserProfile = () => {
  const { user } = useAuthContext()

  return (
    <div className="rounded-md py-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white mb-4">Perfil</h1>
      <ScrollArea>
        <ProfileForm user={user as IUserUpdate} />
      </ScrollArea>
    </div>
  )
}
