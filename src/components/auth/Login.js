import React, { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser } from "../manager/UserProvider"



export const Login = ({setToken}) => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setisUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
    
        const user = {
          username: username.current.value,
          password: password.current.value
        }
    
        loginUser(user).then(res => {
        
          if ("valid" in res && res.valid) {
            setToken(res.token, res.swapper_id)
            navigate("/")}
          else {
            setisUnsuccessful(true)
          }
        })
      }
   


    return (<>
        
     
          
          
           
            <div className="p-10 w-full">
            <span className="text-8xl" >Welcome to HomePlace</span>
                <form className="" onSubmit={handleLogin}>
                    <fieldset className=" ">
                    <label className="" >username</label>
                            <input type="text"
                                ref={username}
                                className=""
                                placeholder=""
                                required autoFocus />
                    </fieldset>
                    <fieldset className="">
                    
                    <label className="" >password</label>
                            <input type="password"
                               ref={password}
                                className=""
                                placeholder=""
                                required autoFocus />
                          
                    </fieldset>
                    <fieldset className="">
                        <button className="btn" type="submit">
                            Sign in
                        </button>
                        <Link className="" to="/register">Is this your first visit?</Link>
                    </fieldset>
                </form>
      
            </div>
            
          
                
        
        </>
    )
}

