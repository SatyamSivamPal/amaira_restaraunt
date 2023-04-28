import React from 'react'
import { useSearchParams } from 'react-router-dom'

function PaymentSucess() {
    const searchQuery = useSearchParams()[0]
    console.log(searchQuery);
  return (
    <div>
      <h1>Order Successfull....</h1>
    </div>
  )
}

export default PaymentSucess
