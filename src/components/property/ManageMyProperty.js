import { useEffect, useState } from "react"
import { deleteProperty, getMyProperties, getMyProperty } from "../manager/PropertyProvider"
import { NewPropertyForm } from "./NewPropertyForm"
import { PropertyBox } from "./PropertyBox"
import {Flex, Button, Box, Heading} from '@chakra-ui/react'

export const ManageMyProperty =() => {
    const [property, setProperties] = useState({})

    useEffect(() => {
    getMyProperty().then((data) => setProperties(data))
    
    },[])
    
    const deleteMyProperty = (id) => {
        deleteProperty(id).then(()=> getMyProperty().then((data) => setProperties(data)))
    }
    
    
        return (<>
       {property ? (
        <Heading bg="teal" color="white" p="4"align="center" fontFamily="body"as="h2" size="2xl">
          Manage Your Home
        </Heading>
      ) : (
        <Heading as="h2" size="xl">
          Submit Your Home
        </Heading>
      )}
       
       
            {property.address ?<>
                <Flex direction = "row-reverse" justify="space-evenly" p="10">
                <Button bg="red.600"color='white'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='md'
          textTransform='uppercase'
          my='auto' onClick={()=>deleteMyProperty(property.id)}>Delete my property</Button>
                <Box h="full"my="auto"><PropertyBox property={property}/></Box>
                <NewPropertyForm property={property}/>
                
                </Flex>
              
               </>
               : ""}
    
            
        
        </>
        )
    }
