import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllAreas, getSingleArea } from "../manager/AreaProvider"
import { getAllProperties, getAllPropertiesByFilter, getMyProperties, getPropertyByArea } from "../manager/PropertyProvider"
import { FormFilter } from "../property/FormFilter"
import { PropertyContext } from "../manager/ContextProvider"
import { getSwapperById } from "../manager/SwapperProvider"
import { PropertyBox } from "../property/PropertyBox"
import {
    Box,
    Flex,
    Heading,
    Button,
    SimpleGrid
} from '@chakra-ui/react'
import { getAllPropertyTypes } from "../manager/PropertyTypeProvider"

export const Home = () => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [swapper, setSwapper] = useState({})
    const [homeProperties, setHomeProperties] = useState([])
    const [explore, setExplore]= useState([])
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
        if (swapper.properties) {
            getPropertyByArea(swapper.properties[0].area.id).then((data) => setHomeProperties(data))
            getSingleArea(swapper.properties[0].area.id).then((data) => setArea(data))
            getAllProperties().then((data)=> {
                let explorerProperties = data.filter((fil) => fil.area.id !== swapper.properties[0].area.id)
                
                setExplore(explorerProperties)
            })
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


        <Box height="400px" w="100%"position="relative" display="flex" bg="url('https://static.trip101.com/main_pics/171385/medium.jpg') center center / cover no-repeat"
            direction="row" gap="8" p="8">
            {/* <Box color="white"p="10"w="50%">Escape the ordinary with our cutting-edge home swapping platform. Swap homes with fellow explorers in your area and unlock a world of adventure without leaving town. Discover hidden gems, immerse yourself in new neighborhoods, and indulge in local experiences. Join our community today and ignite your sense of wanderlust. Welcome to the ultimate home swapping experience!</Box> */}
            <Box w="60%"> 
            <Heading fontFamily="body" pt="24" color="white" size="2xl">Welcome to HomePlace!</Heading>
            <Flex direction="row" justify="start" gap="4" p="4">
            <Button colorScheme="telegram">Signup</Button>
            <Button colorScheme="facebook">Login</Button>
            </Flex>
            </Box>
            <Box w="40%" align="center" position="relative" bottom="30px">
            <Heading size="lg" color="white"  fontFamily="body">Find your next stay</Heading>
            <FormFilter  HandleFilter={HandleFilter} HandleFilterSubmit={HandleFilterSubmit} pool={pool} yard={yard} square_footage={square_footage} searchArea={searchArea} propertyType = {propertyType} areas={areas} property_types={property_types} />
            </Box>
       
        </Box>
        {swapper !== "" ? <>
            <Heading bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Showing properties in {area.neighborhood}</Heading>
            <SimpleGrid p="5" columns={3} spacing={10}>
                {
                    homeProperties.map((property) => {
                        return <PropertyBox property={property} />
                    })}

            </SimpleGrid>
            <Heading bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Explore Other Neighborhoods</Heading>
            <SimpleGrid p="5" columns={3} spacing={10}>
                {
                    explore.sort(() => 0.5 - Math.random()).slice(0, 3).map((property) => {
                        return <PropertyBox property={property} />
                    })}

            </SimpleGrid>
        </>
            : ""}
    </>
    )
}
