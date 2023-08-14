import React from 'react'

import AdminContent from './components/AdminContent'
import getRecurringPricesWithProducts from '@/actions/getRecurringPricesWithProducts'

const Admin = async () => {
    const pricesWithProducts = await getRecurringPricesWithProducts();
  return (
    <div>
        <h1>Admin</h1>
        <AdminContent pricesWithProducts={pricesWithProducts} />
    </div>
  )
}

export default Admin