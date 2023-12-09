import React from 'react'
import ChangeProfilePicture from './ChangeProfile'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'

const Index = () => {
  return (
    <div>

        <ChangeProfilePicture/>
        <EditProfile/>
        <UpdatePassword/>
        <DeleteAccount/>
    </div>
  )
}

export default Index