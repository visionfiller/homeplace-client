import { useEffect, useState } from "react"
import { deleteProperty, getMyProperties, getMyProperty } from "../manager/PropertyProvider"
import { NewPropertyForm } from "./NewPropertyForm"
import { PropertyBox } from "./PropertyBox"

export const ManageMyProperty =() => {
    const [property, setProperties] = useState({})

    useEffect(() => {
    getMyProperty().then((data) => setProperties(data))
    
    },[])
    
    const deleteMyProperty = (id) => {
        deleteProperty(id).then(()=> getMyProperty().then((data) => setProperties(data)))
    }
    
    
        return (<>
      
       
       
            {property.address ?<>
                <PropertyBox property={property}/>
                <NewPropertyForm property={property}/>
                <button className="btn btn-warning" onClick={()=>deleteMyProperty(property.id)}>Delete my property</button>
               </>
               : ""}
    
            
        
        </>
        )
    }
