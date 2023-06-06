import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({token}) => {
  const navigate = useNavigate()
    return <>
     <ul className="flex row justify-evenly">
          <li> <Link to="/">Home</Link></li>
           <li> <Link to="/myproperty">Manage My Property</Link></li>
           <li> <Link to="/property_list">List of Properties</Link></li>    
           <li> <Link to="/newproperty_form">Submit my Home</Link></li>  
           <li> <Link to="/myswaps">My Swaps</Link></li>     
      
            <li> <Link  onClick={() =>  {localStorage.removeItem("homeplace_user").then(()=>{navigate("/login") }) }}>Logout</Link></li>

          </ul>
    </>
}