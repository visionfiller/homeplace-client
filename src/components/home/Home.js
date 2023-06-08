import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllAreas, getSingleArea } from "../manager/AreaProvider"
import { getAllPropertiesByFilter, getMyProperties, getPropertyByArea } from "../manager/PropertyProvider"
import { FormFilter } from "../property/FormFilter"
import { PropertyContext } from "../manager/ContextProvider"
import { getSwapperById } from "../manager/SwapperProvider"
import { PropertyBox } from "../property/PropertyBox"
import {
    FormControl,
    Box,
    FormLabel,
    Flex,
    Form,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    Button,
    Select, 
    Checkbox,
    CheckboxGroup,
    Stack,
    Container
  } from '@chakra-ui/react'

export const Home =() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [swapper,setSwapper] = useState({})
    const [homeProperties, setHomeProperties] = useState([])
    const {properties, setProperties} = useContext(PropertyContext)
    const[area, setArea] = useState({})
    const [areas, setAreas] = useState([])
    const [pool, setPool] = useState(false)
    const [yard, setYard] = useState(false)
    const [searchArea, setSearchArea] = useState("")
    const [square_footage, setSquareFootage] = useState(false)
    
    const navigate = useNavigate()
    useEffect(()=>{
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data)=> setSwapper(data))
        getAllAreas().then((data)=> setAreas(data))
    },[])
    useEffect(() => {
        if (swapper.properties > 0){
    getPropertyByArea(swapper.properties[0].area.id).then((data) => setHomeProperties(data))
    getSingleArea(swapper.properties[0].area.id).then((data) => setArea(data))}
    else{
        getPropertyByArea(1).then((data) => setHomeProperties(data))
        getSingleArea(1).then((data) => setArea(data))
    }
    

   
    },[swapper])
    const HandleFilterSubmit = (event, pool, yard, searchArea, square_footage) => {
        event.preventDefault()
        let url=""
        if (pool) {
            url += `has_pool&`
            
        }
         if (yard) {
            url += `has_yard&`
           
        }
         if (square_footage) {
            url += `min_sq_feet=${square_footage}&`
            
        }
        if (searchArea) {
            url += `area=${searchArea}`
        }
        else {
         url += ""
            
        }
        getAllPropertiesByFilter(url).then((data)=> {
        setProperties(data)})
        .then(()=> navigate('/property_list', {searchedproperties:{properties}}))
    }
    const HandleFilter = (event) => {
        switch (event.target.name) {
            case "pool":
                setPool(event.target.checked)
                break
            case "yard":
                setYard(event.target.checked)
                break
            case "square_footage":
                setSquareFootage(parseInt(event.target.value))
                break
            case "area":
                setSearchArea(parseInt(event.target.value))
                break
        }
    }
    
    
    
    
        return (<>
       
     
        <Flex bg="url('https://static.trip101.com/main_pics/171385/medium.jpg') center center / cover no-repeat"
        direction="row" gap="8"p="8">
            {/* <Box color="white"p="10"w="50%">Escape the ordinary with our cutting-edge home swapping platform. Swap homes with fellow explorers in your area and unlock a world of adventure without leaving town. Discover hidden gems, immerse yourself in new neighborhoods, and indulge in local experiences. Join our community today and ignite your sense of wanderlust. Welcome to the ultimate home swapping experience!</Box> */}
       <Box w="50%"> <Heading fontFamily="body" pt="24"color="white" size="2xl">Welcome to HomePlace!</Heading></Box>
        <Box bg="white" rounded="md" p="4"border="1px"w="50%">
                <Heading size="lg" fontFamily="body">Find your next stay</Heading>
                <FormControl p="3" w='50%'>                
              
                    <CheckboxGroup>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox name="pool" type="checkbox" checked={pool} onChange={HandleFilter}>Has Pool?</Checkbox>
                    <Checkbox name="yard" type="checkbox" checked={yard} onChange={HandleFilter}>Has Yard?</Checkbox>
                    </Stack>
                    </CheckboxGroup>
               
               
                    <FormLabel>Area</FormLabel>
                    <Select name="area" onChange={HandleFilter}>
                        <option>Select an area</option>
                        {areas.map((area) => {
                            return <option key= {area.id} value={area.id}>{area.neighborhood}</option>
                        })}
                    </Select>
              
                <fieldset>
                    <FormLabel>Home Size</FormLabel>
                    <input className="w-3/4" type="range" min="1000" max="10000" id="tempB" onChange={HandleFilter} name="square_footage"  />
                    <div>{square_footage}</div><FormLabel>Square Feet</FormLabel>
                </fieldset>
                <Button onClick={(event)=> HandleFilterSubmit(event, pool, yard, searchArea, square_footage)} className="btn">See Results</Button>
            </FormControl>
         
        </Box>
        </Flex>
        
        




        {swapper !== "" ? <>
        <Heading bg="teal" color="white"fontFamily="body" p="4" size="md" w="100%">Showing properties in {area.neighborhood}</Heading>
        <Flex direction = "row" p="10">
        {
        homeProperties.map((property) => {
        return <PropertyBox property={property} />
        })}
            
        </Flex>
        </>
        : ""}
        </>
        )
    }
