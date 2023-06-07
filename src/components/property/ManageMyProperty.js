import { useEffect, useState } from "react"
import { deleteProperty, getMyProperties } from "../manager/PropertyProvider"
import { NewPropertyForm } from "./NewPropertyForm"

export const ManageMyProperty =() => {
    const [properties, setProperties] = useState([])

    useEffect(() => {
    getMyProperties().then((data) => setProperties(data))
    },[])
    
    const deleteMyProperty = (id) => {
        deleteProperty(id).then(()=> getMyProperties().then((data) => setProperties(data)))
    }
    
    
        return (<>
        <div className="">
        {
        properties.map((property) => {
        return <>
            
                <div key={property.id}>{property.address}</div>
                <img className="w-1/4 h-auto"src={property.image}/>
                <NewPropertyForm property={property}/>
                <button className="btn btn-warning" onClick={()=>deleteMyProperty(property.id)}>Delete my property</button>
                </>
        })}
            
        </div>
        </>
        )
    }
