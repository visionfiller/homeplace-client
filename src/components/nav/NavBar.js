import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSwapperById } from "../manager/SwapperProvider"

export const NavBar = ({token}) => {
  const navigate = useNavigate()
  const HomePlaceUser = localStorage.getItem("homeplace_user")
  const HomePlaceUserObject = JSON.parse(HomePlaceUser)
  const [swapper, setSwapper] = useState({})

  useEffect(()=> {
      getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data))
  },[])
    return <>
     <ul className="flex row justify-evenly">
          <li> <Link to="/">Home</Link></li>
           {swapper.has_listing? <li> <Link to="/myproperty">Manage My Property</Link></li>
           : <li> <Link to="/newproperty_form">Submit my Home</Link></li>  }
           <li> <Link to="/property_list">List of Properties</Link></li>    
           
           <li> <Link to="/myswaps">My Swaps</Link></li>     
      
            <li> <Link  onClick={() =>  {localStorage.removeItem("homeplace_user").then(()=>{navigate("/login") }) }}>Logout</Link></li>

          </ul>
    </>
}