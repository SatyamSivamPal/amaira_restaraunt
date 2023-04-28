import "./app.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "react-use-cart";
import PaymentSucess from "./pages/paymentSuccess/PaymentSucess";

function App() {
  return (
    <CartProvider>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/paymentsuccess" element={<PaymentSucess />}></Route>
    </Routes>
    </CartProvider>
    
  );
    
}

export default App;
