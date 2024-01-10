import React, { useState } from 'react'
import {FcGoogle} from "react-icons/fc"

const Login = () => {

    const[gender,setGender] = useState("")
    const[date,setDate] = useState("")


    const loginHandler=()=>{

    }
 
    return (
        <div className="login">
          <main>
            <h1 className="heading">LOGIN</h1>
    
            <div>
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
    
            <div>
              <label>Date of birth</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
    
            <div>
              <p>Already Signed In Once</p>
              <button onClick={loginHandler}>
                <FcGoogle /> <span>Sign in with Google</span>
              </button>
            </div>
          </main>
        </div>
      );
}

export default Login