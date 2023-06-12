import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UploadWidget } from "../cloudinary/UploadWidget"
import { getAllAreas } from "../manager/AreaProvider"
import { addNewProperty, updateProperty } from "../manager/PropertyProvider"
import { getAllPropertyTypes } from "../manager/PropertyTypeProvider"
import { FormControl, Checkbox,Input, FormLabel,Select,useDisclosure, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { AreaForm } from "../forms/AreaForm"


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
            square_footage: parseInt(newProperty.square_footage),
            pool: newProperty.pool,
            yard: newProperty.yard,
            image: newProperty.image
        }
        if (property) {
            updateProperty(data).then(()=> {
                navigate("/property_list")})
        }
        else{
        
        addNewProperty(data).then(()=> {
            navigate("/property_list")})}
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
    {/* <form>
        {property ?  <h2 className="text-3xl">Manage Your Home</h2>
        : <h2 className="text-3xl">Submit Your Home</h2>}
        <fieldset>
        <label>Address</label>
        <input value = {newProperty.address} name="address" onChange={(event)=> HandleControlledInput(event)} className=" border border-gray-700" type="text" />
        </fieldset>
        <fieldset>
        <select value = {newProperty.area.id} name="area" onChange={(event)=> HandleControlledInput(event)}>
            <option>Select an Area</option>
            {areas.map((area)=> <option key={area.id}value={area.id}>{area.neighborhood}</option>)}
        </select>
        <Button onClick={onOpen}>Add a new area</Button>
        <AreaForm isOpen={isOpen} onClose={onClose} getAreas={getAreas} />
        </fieldset>
        <fieldset>
        <select value = {newProperty.property_type?.id} name="property_type" onChange={(event)=> HandleControlledInput(event)}>
            <option>Select a property type</option>
            {propertyTypes.map((property_type)=> <option key={property_type.id}value={property_type.id}>{property_type.name}</option>)}
        </select>
        </fieldset>
        <fieldset>
        <label>How many bedrooms?</label>
        <input value = {newProperty.bedrooms} name="bedrooms" onChange={(event)=> HandleControlledInput(event)} type="number"></input> 
        </fieldset>
        <fieldset>
        <label>How many bathrooms??</label>
        <input value = {newProperty.bathrooms} name="bathrooms" onChange={(event)=> HandleControlledInput(event)} type="number"></input> 
        </fieldset>
        <fieldset>
        <label>How large is your home?</label>
        <input value = {newProperty.square_footage} name="square_footage" onChange={(event)=> HandleControlledInput(event)} type="number"></input> <label>Square Feet</label>
        </fieldset>
        <fieldset>
            <label>Pool?</label>
            <input checked={newProperty.pool} name="pool" onChange={(event)=> HandleControlledInputChecked(event)}type="checkbox"/>
        </fieldset>
        <fieldset>
            <label>Yard?</label>
            <input checked={newProperty.yard} name="yard" onChange={(event)=> HandleControlledInputChecked(event)} type ="checkbox"/>
            </fieldset>
            <fieldset className="p-4 mx-auto flex row justify-evenly items-center">
                {url === "" ? ""
                :  <img className="h-1/3 w-1/3" src={url}/>}
                
                <UploadWidget onUpload={handleOnUpload}/>
               

       
    
                </fieldset>
    <button onClick={(event)=> HandleSubmit(event)}>Submit</button>
    </form>
    </> */}
    <Box>
      {property ? (
        <Heading fontFamily="body"as="h2" size="xl">
          Manage Your Home
        </Heading>
      ) : (
        <Heading as="h2" size="xl">
          Submit Your Home
        </Heading>
      )}

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
          <Button onClick={onOpen}>Add a new area</Button>
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
          <FormLabel>Pool?</FormLabel>
          <Checkbox
            checked={newProperty.pool}
            name="pool"
            onChange={HandleControlledInputChecked}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Yard?</FormLabel>
          <Checkbox
            checked={newProperty.yard}
            name="yard"
            onChange={HandleControlledInputChecked}
          />
        </FormControl>
        <FormControl mt="4">
            <FormLabel>Image</FormLabel>
       
                {url === "" ? ""
                :  <Image h="50%" w="full"src={url} alt={property.imageAlt} />}
                
                <UploadWidget onUpload={handleOnUpload}/>
               

       
    
                
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Box>
    </>
}