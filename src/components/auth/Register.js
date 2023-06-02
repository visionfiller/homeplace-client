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
       
        <div className="h-screen w-screen ">
            <div className="pt-48 md:grid grid-cols-3 sm:flex flex-col s">
             
                <div className="w-1/2"></div>
                <div className="p-10 w-full">
                    <span className="text-4xl text-white lowercase opacity-80 w-full" >register for the white rabbit</span>
                    <section className="w-full h-full relative">
                        <form className="m-auto form-control text-right " onSubmit={handleRegister}>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="text-white text-lg" >username</label>
                                <input onChange={updateUser}
                                    type="text" id="username"
                                    className="block py-2.5 px-0 w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    placeholder="" required autoFocus />

                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="text-white text-lg" >first name</label>
                                <input onChange={updateUser}
                                    type="text" id="first_name"
                                    className="block py-2.5 px-0 w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    placeholder="" required autoFocus />

                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="text-white text-lg" >last name</label>
                                <input onChange={updateUser}
                                    type="text" id="last_name"
                                    className="block py-2.5 px-0 w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    placeholder="" required autoFocus />

                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="text-white text-lg" >email</label>
                                <input onChange={updateUser}
                                    type="email" id="email"
                                    className="block py-2.5 px-0 w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    placeholder="" required />


                            </fieldset>
                            <fieldset className=" pt-4 flex row justify-evenly items-center">
                                <label className="text-white text-lg" >password</label>
                                <input onChange={updateUser}
                                    type="password" id="password"
                                    className="block py-2.5 px-0 w-1/2 text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
            </div>
        </div>
    </>
    )
}

