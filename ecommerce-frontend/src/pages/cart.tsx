import { useEffect, useState } from "react";
import {VscError} from "react-icons/vsc"
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";



const Cart = () => {

  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const[couponCode,setCouponCode] = useState<string>("");
  const[isValidCouponCode,setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(()=>{

    const timeOutId = setTimeout(()=>{
      if (Math.random()> 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    },1000);
     
    return()=>{
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };

  },[couponCode])



  useEffect(()=>{

    dispatch(calculatePrice())

  },[cartItems])

  return (
    <div className="cart">
      <main>
        { cartItems.length > 0 ?  cartItems.map((i,idx)=>(
            <CartItemCard key={idx} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler}/>
          )) : <h1>No Items In Cart</h1>
         
        }
      </main>
      <aside>
        <p>Subtotal:₹{subtotal}</p>
        <p>Shipping Charges:₹{shippingCharges}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total} </b>
        </p>

        <input 
          type="text" 
          placeholder="Coupon Code"
          value={couponCode} 
          onChange={(e)=>setCouponCode(e.target.value)}
        />

        {
          couponCode && (isValidCouponCode ? 
            (<span className="green">
                ₹{discount} off using the <code>{couponCode}</code>
            </span>
            ) : 
            (
              <span className="red">Invalid Coupon <VscError/> </span>
            ))
        }

        {/* {
          cartItemCard.length > 0 && <Link to="/shipping">Checkout</Link>
        } */}

      </aside>
    </div>
  )
}

export default Cart