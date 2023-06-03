import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllSingleArea, getSingleArea } from "../manager/AreaProvider"
import { getAllProperties, getAllPropertiesWithPool } from "../manager/PropertyProvider"

export const PropertyList = () => {
const[area, setArea] = useState({})
const [properties, setProperties] = useState([])
const HomePlaceUser = localStorage.getItem("homeplace_user")
const HomePlaceUserObject = JSON.parse(HomePlaceUser)
const [filter, setFilter] = useState(false)
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getAllProperties();
      const newData = data.filter(
        (property) => property.owner.id !== HomePlaceUserObject.swapper_id
      );
      setProperties(newData);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      // Handle the error gracefully, e.g., display an error message
      console.error("Error fetching properties:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  fetchData();
},[])
useEffect(()=>{
getSingleArea(HomePlaceUserObject.area_id).then((data) => setArea(data))
},[])


const HandleFilter= () => {
    setFilter((prevFilter) => !prevFilter);
}


    return (<>
    {loading? <div className="text-4xl text-center h-full my-auto"> Loading Future Homes...</div>
    : <>
    <form className="flex row justify-center w-100%">
    <fieldset>
    <label>Has Pool</label>
    <input  type="checkbox" checked={filter} onChange={HandleFilter
                }></input>
    </fieldset>
    <fieldset>
    <label>Has Yard</label>
    <input type="checkbox"></input>
    </fieldset>
    </form>

    <div className="p-10 flex flex-col">
    {
    properties.map((property) => {
    return <Link key={property.id} to={`/property_details/${property.id}`}>
            <div key={property.id}>{property.address}</div>
            <img className="w-1/4 h-1/4 object-cover"src={property.image}/>
            </Link>
            
    })}
        
    </div>
    </>
}
    </>

    )
}