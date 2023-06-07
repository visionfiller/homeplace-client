import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../manager/UserProvider"


export const Register = ({setToken}) => {
    const [user, setUser] = useState({})
    
    let navigate = useNavigate()

    const registerNewUser = () => {

        return createUser({
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password
        }).then(res => {
            if ("valid" in res && res.valid) {
              setToken(res.auth_token, res.swapper_id)
              navigate("/")
            }
          })
           
    }
   



    const handleRegister = (e) => {
        e.preventDefault()
        registerNewUser().then(()=> navigate("/"))
                
            
    }
    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }
   

    return (<>
       
       
             
                <div className="p-10 w-full">
                    <span className="" >register for homeplace</span>
                    <section className="w-full h-full relative">
                        <form className="m-auto form-control text-right " onSubmit={handleRegister}>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="" >username</label>
                                <input onChange={updateUser}
                                    type="text" id="username"
                                    className=""
                                    placeholder="" required autoFocus />

                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="" >first name</label>
                                <input onChange={updateUser}
                                    type="text" id="first_name"
                                    className=""
                                    placeholder="" required autoFocus />

                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="" >last name</label>
                                <input onChange={updateUser}
                                    type="text" id="last_name"
                                    className=""
                                    placeholder="" required autoFocus />

                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="" >email</label>
                                <input onChange={updateUser}
                                    type="email" id="email"
                                    className=""
                                    placeholder="" required />


                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="" >password</label>
                                <input onChange={updateUser}
                                    type="password" id="password"
                                    className=""
                                    placeholder="" required />

                            </fieldset>
                            
                            <div className="flex row justify-start gap-10 pt-4 p-5">
                              
                                <fieldset className=" flex row">
                                    <button className="btn bg-secondary mr-auto ml-auto" type="submit"> Register </button>
                                </fieldset>
                            </div>
                        </form>
                    </section>
                </div>
           
    </>
    )
}

