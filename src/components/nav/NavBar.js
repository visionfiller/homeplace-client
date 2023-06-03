import { Link } from "react-router-dom"

export const NavBar = ({token}) => {
    return <>
     <ul className="flex row justify-evenly">
          <li> <Link to="/">Home</Link></li>
           <li> <Link to="/myproperty">Manage My Property</Link></li>
           <li> <Link to="/property_list">List of Properties</Link></li>    
           <li> <Link to="/newproperty_form">Swap my Home</Link></li>    
      
            <li> Logout</li>

          </ul>
    </>
}