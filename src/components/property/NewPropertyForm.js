import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UploadWidget } from "../cloudinary/UploadWidget"
import { getAllAreas } from "../manager/AreaProvider"
import { addNewProperty, updateProperty } from "../manager/PropertyProvider"
import { getAllPropertyTypes } from "../manager/PropertyTypeProvider"
import { Flex, FormControl,IconButton, Checkbox,Input, Textarea,FormLabel,Select,useDisclosure, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { AreaForm } from "../forms/AreaForm"
import { AddIcon } from '@chakra-ui/icons'


export const NewPropertyForm = ({property}) => {
    const navigate = useNavigate()
    const [areas, setAreas] = useState([])
    const [propertyTypes, setPropertyTypes] = useState([])
    const [url, setURL] = useState("")
    const [error, updateError] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newProperty, setNewProperty] = useState({
        address: "",
        area: 0,
        square_footage: 0,
        property_type: 0,
        bathrooms: 0,
        bedrooms: 0,
        description: "",
        pool: false,
        yard: false,
        image: ""

    })


    useEffect(()=>{
        if(property){
            setNewProperty(property)
        }
        else{
            let copy = {...newProperty}
            setNewProperty(copy)
        }
    },[property])

    useEffect(()=> {
        getAreas()
        getAllPropertyTypes().then((data)=> setPropertyTypes(data))
    },[])

    const getAreas = () => {
        getAllAreas().then((data)=> setAreas(data))
    }

    const HandleControlledInput=(event)=>{
        const copy = {...newProperty}
        if (event.target.name === "area"){
            copy[event.target.name] = areas.find((area) => area.id === parseInt(event.target.value))
        }
        else if (event.target.name === "property_type"){
            copy[event.target.name] = propertyTypes.find((propertyType) => propertyType.id === parseInt(event.target.value))
        }

        else{
        copy[event.target.name] = event.target.value}
        setNewProperty(copy)
    }
    const HandleControlledInputChecked=(event)=>{
        const copy = {...newProperty}
      
        copy[event.target.name] = event.target.checked
        setNewProperty(copy)
    }
    const HandleSubmit =(event) => {
        event.preventDefault()
        let data = {
            id: newProperty.id,
            address: newProperty.address,
            area: parseInt(newProperty.area.id),
            property_type: parseInt(newProperty.property_type.id),
            bathrooms: parseInt(newProperty.bathrooms),
            bedrooms: parseInt(newProperty.bedrooms),
            description: newProperty.description,
            square_footage: parseInt(newProperty.square_footage),
            pool: newProperty.pool,
            yard: newProperty.yard,
            image: newProperty.image
        }
        if (property) {
            updateProperty(data).then(()=> {
                navigate("/myproperty")})
        }
        else{
        
        addNewProperty(data).then(()=> {
            navigate("/myproperty")})}
    }

    function handleOnUpload(error, result, widget) {
        if ( error ) {
          updateError(error);
          widget.close({
            quiet: true
          });
          return;
        }
        setURL(result?.info?.secure_url)
       
      }
      const HandleControlledInputChangeCustomer = (url) => {
        const copy = {...newProperty}
        copy.image = url
        setNewProperty(copy)
    }
    
      useEffect(
        () => {
            if(url !== ""){
                HandleControlledInputChangeCustomer(url)
                
                }
    
    
        },[url])
    return <>
   
    <Box bg="white" mx="auto" w="50%" p="8" rounded="lg" border="2px" borderColor="teal">
     

      <form onSubmit={HandleSubmit}>
        <FormControl mt={4}>
          <FormLabel>Address</FormLabel>
          <Input
            value={newProperty.address}
            name="address"
            onChange={HandleControlledInput}
            border="1px"
            borderColor="gray.700"
            type="text"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Area</FormLabel>
          <Flex>
          <Select
            value={newProperty.area.id}
            name="area"
            onChange={HandleControlledInput}
            border="1px"
            borderColor="gray.700"
          >
            <option>Select an Area</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.neighborhood}
              </option>
            ))}
           
          </Select>
          <IconButton icon={<AddIcon />}bg="transparent" onClick={onOpen} _hover={{ backgroundColor: "transparent" }}></IconButton>
          </Flex>
        <AreaForm isOpen={isOpen} onClose={onClose} getAreas={getAreas} />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Property Type</FormLabel>
          <Select
            value={newProperty.property_type.id}
            name="property_type"
            onChange={HandleControlledInput}
            border="1px"
            borderColor="gray.700"
          >
            <option>Select a property type</option>
            {propertyTypes.map((propertyType) => (
              <option key={propertyType.id} value={propertyType.id}>
                {propertyType.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>How many bedrooms?</FormLabel>
          <Input
            value={newProperty.bedrooms}
            name="bedrooms"
            onChange={HandleControlledInput}
            type="number"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>How many bathrooms?</FormLabel>
          <Input
            value={newProperty.bathrooms}
            name="bathrooms"
            onChange={HandleControlledInput}
            type="number"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>How large is your home?</FormLabel>
          <Input
            value={newProperty.square_footage}
            name="square_footage"
            onChange={HandleControlledInput}
            type="number"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Talk about what makes your home great!</FormLabel>
          <Textarea
            value={newProperty.description}
            name="description"
            onChange={HandleControlledInput}
            type="text"
          />
        </FormControl>
        <Flex>
        <FormControl mt={4}>
          <FormLabel>Pool?</FormLabel>
          <Checkbox
            isChecked={newProperty.pool}
            name="pool"
            onChange={HandleControlledInputChecked}
          />
        </FormControl>

        <FormControl mt={4} >
          <FormLabel>Yard?</FormLabel>
          <Checkbox
            isChecked={newProperty.yard}
            name="yard"
            onChange={HandleControlledInputChecked}
          />
        </FormControl>
        </Flex>
        <FormControl mt="4">
            
       
                {url === "" ? ""
                :  <Image h="50%" w="full"src={url}  />}
                
               <UploadWidget onUpload={handleOnUpload}/>
               

       
    
                
        </FormControl>
        <Box align="center">
        <Button size="lg"align="center" mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
        </Box>
      </form>
    </Box>
    </>
}