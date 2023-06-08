import { useEffect, useState } from "react"
import { deleteProperty, getMyProperties } from "../manager/PropertyProvider"
import { NewPropertyForm } from "./NewPropertyForm"
import { PropertyBox } from "./PropertyBox"

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
            
                <PropertyBox property={property}/>
                <NewPropertyForm property={property}/>
                <button className="btn btn-warning" onClick={()=>deleteMyProperty(property.id)}>Delete my property</button>
                </>
        })}
            
        </div>
        </>
        )
    }
