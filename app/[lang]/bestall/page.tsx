import React from 'react'
import OrderContent from './components/OrderContent'
import getAllProductInfo from '@/actions/getAllProductInfo';

const OrderPage = async () => {
const productInfo = await getAllProductInfo();

  return (
    <div>
      <OrderContent productInfo={productInfo} />
    </div>
  )
}

export default OrderPage