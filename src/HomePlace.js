import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Authorized } from "./components/auth/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"

import { NavBar } from "./components/nav/NavBar"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Home } from "./components/home/Home"
import { PropertyList } from "./components/property/PropertyList"
import { PropertyDetails } from "./components/property/PropertyDetails"
import { PropertyProvider } from "./components/manager/ContextProvider"
import { useMediaQuery } from "@chakra-ui/react"
import { MobileNavBar } from "./components/nav/MobileNavBar"


export const  HomePlace = () => {
  const [token, setTokenState] = useState(localStorage.getItem('homeplace_user'))
  const [isMobile] = useMediaQuery("(max-width: 768px)") 
	
  
	const setToken = (auth_token) => {
	let token = {
		"auth_token": auth_token
	}
	
	localStorage.setItem('homeplace_user', JSON.stringify(token))
	setTokenState(token)
	}

	const theme = extendTheme({
		fonts: {
			body: "Dosis, sans-serif",
			// ...
		  },
		
		styles: {
		  global: 
		  {
			body: {
			  bg: "gray.100", // Set your desired background color here
			},
		  },
		},
	  });
  
	return <>
	 <ChakraProvider theme={theme}>
	<PropertyProvider>
	{isMobile ? <MobileNavBar/>
	: <NavBar />}
	<Routes>
	
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/register" element={<Register setToken={setToken} />} />
	<Route path="/" element={<Home />} />
	<Route path="/property_list" element={<PropertyList />} />
    <Route path="/property_details/:propertyId" element={<PropertyDetails />} />


	  
	<Route path="*" element={
	<Authorized token={token}>

  <ApplicationViews token={token} setToken={setToken}/>
</Authorized>}/>
</Routes>
</PropertyProvider>
</ChakraProvider>
  </>
}


