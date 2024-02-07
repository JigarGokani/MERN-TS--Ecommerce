import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductProps ={
    productId:string;
    photo:string;
    name:string;
    price:number;
    stock:number;
    handler:(cartItem:CartItem)=> string | undefined;

}

const ProductCard = ({productId,name,photo,price,stock,handler}:ProductProps) => {
  return (
    <div className="product-card">
    
    <img src={photo} alt={name} />
    <p>{name}</p>
    <span>₹{price}</span>


    <div>
        <button onClick={()=>handler({productId,price,name,photo,stock,quantity:1})}>
            <FaPlus/>
        </button>
    </div>


    </div>



  )
}

export default ProductCard