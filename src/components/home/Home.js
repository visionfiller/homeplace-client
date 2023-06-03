import { useEffect, useState } from "react"
import { getSingleArea } from "../manager/AreaProvider"
import { getMyProperties, getPropertyByArea } from "../manager/PropertyProvider"

export const Home =() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [properties, setProperties] = useState([])
    const[area, setArea] = useState({})

    useEffect(() => {
    getPropertyByArea(parseInt(HomePlaceUserObject.area_id)).then((data) => setProperties(data))
    getSingleArea(parseInt(HomePlaceUserObject.area_id)).then((data) => setArea(data))
    },[])
    
    
    
    
        return (<>
        <div className="text-6xl">Welcome to HomePlace!</div>
       
        <button>How it works</button>
        





        <div>Showing properties in {area.neighborhood}</div>
        <div className="flex row">
        {
        properties.map((property) => {
        return <>
                <div key={property.id}>{property.address}</div>
                <img className="w-1/4 h-auto"src={property.image}/>
                </>
        })}
            
        </div>
        </>
        )
    }
