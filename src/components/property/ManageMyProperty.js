import { useEffect, useState } from "react"
import { deleteProperty, getMyProperties, getMyProperty } from "../manager/PropertyProvider"
import { NewPropertyForm } from "./NewPropertyForm"
import { PropertyBox } from "./PropertyBox"
import {Flex, Button} from '@chakra-ui/react'

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
                <Flex direction = "row" justify="space-evenly" p="10">
                <PropertyBox property={property}/>
                <NewPropertyForm property={property}/>
                </Flex>
                <Button onClick={()=>deleteMyProperty(property.id)}>Delete my property</Button>
               </>
               : ""}
    
            
        
        </>
        )
    }
