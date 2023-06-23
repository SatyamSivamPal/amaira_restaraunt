import React from 'react';
import { useCart } from 'react-use-cart';
import './product-card.css';
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

axios.defaults.baseURL = process.env.PUBLIC_URL;

const ProductCard = (props) => {
    const {addItem}=useCart();

    const { imgUrl, title, price} = props.item

    const total = parseInt(price)

    const checkouthandler = async (amount) => {

        const { data:{key} } = await axios.get("/api/getkey")
        
        const { data:{order} } = await axios.post("/api/checkout", {
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
              "name": "Amiara",
              "email": "Amaira@gmail.com",
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

    return (
        <div className="single__product">
            <div className="product__img">
                <img src={imgUrl} alt="" className="w-100" />
            </div>

            <div className="product__content">
                <div className="rating text-center">
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                </div>

                <h6>{title}</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="price d-flex align-items-center">
                        Price: ₹ <span>{price}</span>
                    </span>
                    <span className="shopping__icon" onClick={()=>addItem(props.item)}><i class="ri-shopping-cart-line"></i></span>
                </div>
                <div className="order_now" onClick={() => checkouthandler (total)}>
                    <span >Order Now</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
