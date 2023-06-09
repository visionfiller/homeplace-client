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
    Container,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { getAllPropertyTypes } from "../manager/PropertyTypeProvider"

export const Home = () => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [swapper, setSwapper] = useState({})
    const [homeProperties, setHomeProperties] = useState([])
    const { properties, setProperties } = useContext(PropertyContext)
    const [area, setArea] = useState({})
    const [areas, setAreas] = useState([])
    const [property_types, setPropertyTypes] = useState([])
    const [pool, setPool] = useState(false)
    const [yard, setYard] = useState(false)
    const [searchArea, setSearchArea] = useState("")
    const [propertyType, setPropertyType] = useState("")
    const [bathrooms, setBathrooms] = useState("")
    const [bedrooms, setBedrooms] = useState("")
    const [square_footage, setSquareFootage] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data))
        getAllAreas().then((data) => setAreas(data))
        getAllPropertyTypes().then((data) => setPropertyTypes(data))
    }, [])
    useEffect(() => {
        if (swapper.properties > 0) {
            getPropertyByArea(swapper.properties[0].area.id).then((data) => setHomeProperties(data))
            getSingleArea(swapper.properties[0].area.id).then((data) => setArea(data))
        }
        else {
            getPropertyByArea(1).then((data) => setHomeProperties(data))
            getSingleArea(1).then((data) => setArea(data))
        }



    }, [swapper])
    const HandleFilterSubmit = (event, pool, yard, searchArea, square_footage, propertyType, bathrooms, bedrooms) => {
        event.preventDefault()
        let url = ""
        if (pool) { url += `has_pool&` }
        if (yard) { url += `has_yard&` }
        if (square_footage) { url += `min_sq_feet=${square_footage}&` }
        if (searchArea) { url += `area=${searchArea}&` }
        if (propertyType) { url += `property_type=${propertyType}&` }
        if (bathrooms) { url += `bathrooms=${bathrooms}&` }
        if (bedrooms) {
            url += `bedrooms=${bedrooms}`
        }
        else {
            url += ""

        }
        getAllPropertiesByFilter(url).then((data) => {
            setProperties(data)
        })
            .then(() => navigate('/property_list', { searchedproperties: { properties } }))
    }
    const HandleFilter = (event) => {
        const { name, value, type, checked } = event.target;
      
        switch (name) {
          case "pool":
            setPool(checked);
            break;
          case "yard":
            setYard(checked);
            break;
          case "bathrooms":
            setBathrooms(parseInt(value));
            break;
          case "bedrooms":
            setBedrooms(parseInt(value));
            break;
          case "square_footage":
            setSquareFootage(parseInt(value));
            break;
          case "area":
            setSearchArea(parseInt(value));
            break;
          case "property_type":
            setPropertyType(parseInt(value));
            break;
          default:
            break;
        }
      };




    return (<>


        <Flex bg="url('https://static.trip101.com/main_pics/171385/medium.jpg') center center / cover no-repeat"
            direction="row" gap="8" p="8">
            {/* <Box color="white"p="10"w="50%">Escape the ordinary with our cutting-edge home swapping platform. Swap homes with fellow explorers in your area and unlock a world of adventure without leaving town. Discover hidden gems, immerse yourself in new neighborhoods, and indulge in local experiences. Join our community today and ignite your sense of wanderlust. Welcome to the ultimate home swapping experience!</Box> */}
            <Box w="50%"> <Heading fontFamily="body" pt="24" color="white" size="2xl">Welcome to HomePlace!</Heading></Box>
            <Box bg="white" rounded="md" p="4" border="1px" w="50%">
                <Heading size="lg" fontFamily="body">Find your next stay</Heading>
                <FormControl p="3" w='50%'>




                    <FormLabel>Area</FormLabel>
                    <Select name="area" onChange={(event) => HandleFilter(event)}>
                        <option>Select an area</option>
                        {areas.map((area) => {
                            return <option key={area.id} value={area.id}>{area.neighborhood}</option>
                        })}
                    </Select>
                    <FormLabel>Property Type</FormLabel>
                    <Select name="property_type" onChange={(event) => HandleFilter(event)}>
                        <option>Select a property type</option>
                        {property_types.map((propertyType) => {
                            return <option key={propertyType.id} value={propertyType.id}>{propertyType.name}</option>
                        })}
                    </Select>

                    <fieldset>
                        <FormLabel>Home Size</FormLabel>
                        <input className="w-3/4" type="range" min="1000" max="10000" id="tempB" onChange={(event) => HandleFilter(event)} name="square_footage" />
                        <div>{square_footage}</div><FormLabel>Square Feet</FormLabel>
                    </fieldset>
                    <fieldset>
                        <FormLabel>Minimum Bathrooms</FormLabel>
                        <input type="number" min="1" max="10" onChange={HandleFilter} name="bathrooms" />
                        <div>{bathrooms}</div>
                    </fieldset>
                    {/* <NumberInput name="bathrooms" onChange={(event) => HandleFilter(event)} value={bathrooms} min={1} max={10}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput> */}

                    <fieldset>
                        <FormLabel>Minimum Bedrooms</FormLabel>
                        <input type="number" min="1" max="10" id="tempB" onChange={(event) => HandleFilter(event)} name="bedrooms" />
                        <div>{bedrooms}</div>
                    </fieldset>
                    <CheckboxGroup>
                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                            <Checkbox name="pool" type="checkbox" checked={pool} onChange={(event) => HandleFilter(event)}>Has Pool?</Checkbox>
                            <Checkbox name="yard" type="checkbox" checked={yard} onChange={(event) => HandleFilter(event)}>Has Yard?</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                    <Button onClick={(event) => HandleFilterSubmit(event, pool, yard, searchArea, square_footage, propertyType, bedrooms, bathrooms)} className="btn">See Results</Button>
                </FormControl>

            </Box>
        </Flex>






        {swapper !== "" ? <>
            <Heading bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Showing properties in {area.neighborhood}</Heading>
            <Flex direction="row" p="10">
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
