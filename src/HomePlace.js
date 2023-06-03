import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./components/auth/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"

import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/views/ApplicationViews"


export const  HomePlace = () => {
  const [token, setTokenState] = useState(localStorage.getItem('homeplace_user'))
	
  
	const setToken = (auth_token, swapper_id, area_id) => {
	let token = {
		"auth_token": auth_token,
		"swapper_id": swapper_id,
		"area_id": area_id
	}
	
	localStorage.setItem('homeplace_user', JSON.stringify(token))
	setTokenState(token)
	}
  
	return <>
	<Routes>
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/register" element={<Register setToken={setToken} />} />
	  
	<Route path="*" element={
	<Authorized token={token}>
	<NavBar token={token}/>
  <ApplicationViews token={token} setToken={setToken}/>
</Authorized>}/>
</Routes>
  </>
}


