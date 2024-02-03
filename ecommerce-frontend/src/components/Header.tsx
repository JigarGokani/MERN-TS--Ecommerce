import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { User } from '../types/types';



interface PropsType {
    user: User | null;
}


const Header = ({user}:PropsType) => {
    const[isOpen,setIsOpen] = useState(false);

    const logOutHandler=()=>{
        setIsOpen(false);
    }

  return (
    <nav className='header'>
        <Link onClick={()=>setIsOpen(false)} to="/">HOME</Link>
        <Link onClick={()=>setIsOpen(false)} to="/search">
            <FaSearch/>
        </Link >
        <Link onClick={()=>setIsOpen(false)} to="/cart">
            <FaShoppingBag/>
        </Link>
        {user?._id ? (
            <>
                <button onClick={()=>setIsOpen((prev)=>!prev)}>
                    <FaUser/>
                </button>
                <dialog open={isOpen}>
                    <div>
                        {user.role === "admin" && (
                            <Link to="/admin/dashboard">Admin</Link>
                        )}

                        <Link to="/orders">Orders</Link>
                        <button onClick={logOutHandler}>
                            <FaSignOutAlt/>
                        </button>
                    </div>
                </dialog>
            </>
        ):(
            <Link to="/login">
                <FaSignInAlt/>
            </Link>
        )

        }

    </nav>
  )
}

export default Header