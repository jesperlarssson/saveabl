import React from 'react'

import AdminContent from './components/AdminContent'
import BodyText from '@/components/ui/BodyText'


const Admin = async () => {
  return (
    <div>
        <h1 className='font-poppins text-secondary text-3xl mt-8 mx-8'>Admin Panel</h1>
        <BodyText className='mx-8'>Hantera backend</BodyText>
        <AdminContent />
    </div>
  )
}

export default Admin