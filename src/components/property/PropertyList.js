import { useEffect, useState } from "react"
import { getAllProperties } from "../manager/PropertyProvider"

export const PropertyList = () => {
const [properties, setProperties] = useState([])

useEffect(() => {
getAllProperties().then((data) => setProperties(data))
},[])




    return (<>
    <div className="flex row p-10 flex-wrap">
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