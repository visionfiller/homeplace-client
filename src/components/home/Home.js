import { useEffect, useState } from "react"
import { getMyProperties } from "../manager/PropertyProvider"

export const Home =() => {
    const [properties, setProperties] = useState([])

    useEffect(() => {
    getMyProperties().then((data) => setProperties(data))
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
