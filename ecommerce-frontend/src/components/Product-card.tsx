import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";

type ProductProps ={
    productid:string;
    photo:string;
    name:string;
    price:number;
    stock:number;
    handler:()=>void;

}

const ProductCard = ({productid,name,photo,price,stock,handler}:ProductProps) => {
  return (
    <div className="product-card">
    
    <img src={photo} alt={name} />
    <p>{name}</p>
    <span>₹{price}</span>


    <div>
        <button onClick={()=>handler()}>
            <FaPlus/>
        </button>
    </div>


    </div>



  )
}

export default ProductCard