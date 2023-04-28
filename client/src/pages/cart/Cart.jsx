import React from "react";
import { useCart } from "react-use-cart";
import "./cart.css";
import axios from "axios"

const Cart =()=>{



  const{
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  }=useCart();
  if (isEmpty) return <h1 className="text-center">Your Cart is Empty</h1>

  const total = parseInt(cartTotal)


  const checkoutHandler = async (amount) => {

    const { data:{key} } = await axios.get("http://localhost:4000/api/getkey")
    
    const { data:{order} } = await axios.post("http://localhost:4000/api/checkout", {
      amount
    })

    const options = {
      key, 
      amount: order.amount, 
      currency: "INR",
      name: "Amiara Restaraunt",
      description: "Test Transaction",
      image: "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg",
      order_id: order.id, 
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#dc3545"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open();
  
  }
  
  return(
    <section className="py-4 cart_container">
     <div className="row justify-content-center">
        <div className="col-12">
          <h5>Cart:({totalUniqueItems}) Total Items:({totalItems})</h5>
          <table className="table table-light table-hover m-0">
            <tbody>
            {items.map((item,index)=>{
              return(
              <tr key={index}>
                 <td>{item.title}</td>
                 <td>{item.price}</td>
                 <td>Quantity({item.quantity})</td>
                 <td>
                  <button className="btn btn-info " onClick={()=>updateItemQuantity(item.id,item.quantity+1)}><span>+</span></button>
                  <button className="btn btn-info ms-2" onClick={()=>updateItemQuantity(item.id,item.quantity-1)}><span>-</span></button>
                  <button className="btn btn-danger btn-danger-remove ms-2" onClick={()=>removeItem(item.id)}>Remove Item</button>
                 </td>
              </tr>
              )
            })}
            </tbody>
          </table>
         </div>
         <div className="col-auto ms-auto">
          <h2>Total Price:₹{cartTotal}</h2>
          
         </div>
         <div className="col-auto">
          <button 
          className="btn btn-danger m-2" onClick={()=>emptyCart()}> 
            Clear Cart
          </button>
          <button className="btn btn-danger m-2" onClick={() => checkoutHandler (total)}>Buy Now</button>
         </div>
      </div>
    </section>
  );
};



export default Cart;


