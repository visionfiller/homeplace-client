import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllAreas, getAllSingleArea, getSingleArea } from "../manager/AreaProvider"
import { PropertyContext } from "../manager/ContextProvider"
import { getAllProperties, getAllPropertiesByFilter, getPropertyByAddress } from "../manager/PropertyProvider"
import { FormFilter } from "./FormFilter"
import { MapView } from "./MapView"
import { PropertySearch } from "./PropertySearch"
import { IconButton, Container, Flex, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    SimpleGrid,
    Spinner,
    
Input} from '@chakra-ui/react'
import { StarIcon, SearchIcon, RepeatIcon } from '@chakra-ui/icons'
import { PropertyBox } from "./PropertyBox"
import { getAllPropertyTypes, getSinglePropertyType } from "../manager/PropertyTypeProvider"
import { LoadingScreen } from "../home/LoadingScreen"


export const PropertyList = ({ searchTermState }) => {
    const navigate = useNavigate()
    const { properties, setProperties,
        areas, setAreas, 
        property_types, setPropertyTypes,
        pool, setPool,
        yard, setYard,
        searchArea, setSearchArea,
        propertyType, setPropertyType,
        bathrooms, setBathrooms,
        bedrooms, setBedrooms, 
        HandleFilter, HandleFilterSubmit,
        square_footage, setSquareFootage, HomePlaceUserObject } = useContext(PropertyContext)
    // const HomePlaceUser = localStorage.getItem("homeplace_user")
    // const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    // const [area, setArea] = useState({})
    // const [areas, setAreas] = useState([])
    // const [property_types, setPropertyTypes] = useState([])
    // const [pool, setPool] = useState(false)
    // const [yard, setYard] = useState(false)
    // const [searchArea, setSearchArea] = useState("")
    // const [propertyType, setPropertyType] = useState("")
    // const [bathrooms, setBathrooms] = useState("")
    // const [bedrooms, setBedrooms] = useState("")
    // const [square_footage, setSquareFootage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchTerms, setSearchTerms] = useState("")
    const [mapView, setMapView] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    useEffect(() => {
        // getAllAreas().then((data) => setAreas(data))
        // getAllPropertyTypes().then((data) => setPropertyTypes(data))
        if (properties.length) {
            setLoading(true);

    // Simulate a delay of 2 seconds
    setTimeout(() => {
      // Perform your asynchronous operation here
      // Once the operation is complete, setIsLoading(false);
      setLoading(false);
    }, 1000);
           
            return
        }
        else if(properties.length === 0){
            setProperties([])
            setLoading(false)
        }
        else {
     
            showAllProperties()
            
        }
    }, [])
    const showAllProperties = () => {
        setTimeout(() => {
            const fetchData = async () => {
                try {
                    const data = await getAllProperties();
                    if(HomePlaceUserObject){
                    const newData = data.filter(
                        (property) => property.owner.id !== HomePlaceUserObject.swapper_id
                    );
                    setProperties(newData)}
                    else{
                        setProperties(data)
                    }
                    // setLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    // Handle the error gracefully, e.g., display an error message
                    console.error("Error fetching properties:", error);
                    // setLoading(false); // Set loading to false in case of error
                }
            };
            fetchData() 
            setLoading(false);
        }, 1000);
       

       
    }

    const HandleSearch = () => {
        if (searchTerms) {
            const fetchData = async () => {
                try {
                    const data = await getPropertyByAddress(searchTerms);
                    if(HomePlaceUserObject){
                        const newData = data.filter(
                            (property) => property.owner.id !== HomePlaceUserObject.swapper_id
                        );
                        setProperties(newData)}
                        else{
                            setProperties(data)
                        }
                    setLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    // Handle the error gracefully, e.g., display an error message
                    console.error("Error fetching properties:", error);
                    setLoading(false); // Set loading to false in case of error
                }
            };

            fetchData()
        }
    }

    // const HandleFilterSubmit = (event, pool, yard, searchArea, square_footage, propertyType, bathrooms, bedrooms) => {
    //     event.preventDefault()
    //     let url = ""
    //     if (pool) { url += `has_pool&` }
    //     if (yard) { url += `has_yard&` }
    //     if (square_footage) { url += `min_sq_feet=${square_footage}&` }
    //     if (searchArea) { url += `area=${searchArea}&` }
    //     if (propertyType) { url += `property_type=${propertyType}&` }
    //     if (bathrooms) { url += `bathrooms=${bathrooms}&` }
    //     if (bedrooms) {
    //         url += `bedrooms=${bedrooms}`
    //     }
    //     else {
    //         url += ""

    //     }
    //     getAllPropertiesByFilter(url).then((data) => {
    //         setProperties(data)
    //     })
    //         .then(() => onClose())
    // }
   
    // const HandleFilter = (event) => {
    //     const { name, value, type, checked } = event.target;
      
    //     switch (name) {
    //       case "pool":
    //         setPool(checked);
    //         break;
    //       case "yard":
    //         setYard(checked);
    //         break;
    //       case "bathrooms":
    //         setBathrooms(parseInt(value));
    //         break;
    //       case "bedrooms":
    //         setBedrooms(parseInt(value));
    //         break;
    //       case "square_footage":
    //         setSquareFootage(parseInt(value));
    //         break;
    //       case "area":
    //         setSearchArea(parseInt(value));
    //         break;
    //       case "property_type":
    //         setPropertyType(parseInt(value));
    //         break;
    //       default:
    //         break;
    //     }
    //   };

   
    const HandleClearAll = () => {
        setPool(false)
        setYard(false)
        setSquareFootage("")
        setBathrooms("")
        setBedrooms("")
        setSearchArea("")
        setPropertyType("")
        setSearchTerms("")
        setLoading(true)
        showAllProperties()
    }
    const HandleMap = (event) => {
        event.preventDefault()
        setMapView(!mapView)
    }

const getPropertyTypeName= (id) => {
    getSinglePropertyType(id).then((data)=>{
        let name = data.name
       
        return <Badge>{name}</Badge>
    })
   
}

    return (<>
        {loading ? <LoadingScreen />
            : <>
       
       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center">Filter Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%" p="2" mx="auto">
          <FormFilter onClose={onClose} HandleFilter={HandleFilter} HandleFilterSubmit={HandleFilterSubmit} pool={pool} yard={yard} square_footage={square_footage} searchArea={searchArea} propertyType = {propertyType} areas={areas} property_types={property_types}bathrooms={bathrooms} bedrooms={bedrooms} />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
             <Button onClick={handleSubmit} variant='ghost'>Add</Button>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button> *
          </ModalFooter> */}
        </ModalContent>
      </Modal>
          
                    
         
            
                <Flex bg="teal" justify="space-between" alignItems="center">
                <Flex bg="teal" p="2" direction="row" justify="start" alignItems="center">
                {/* <Button onClick={HandleClearAll}><RepeatIcon  color="teal"></RepeatIcon></Button> */}
                <IconButton _hover={{ backgroundColor: "transparent" }}onClick={HandleClearAll} bg="teal" color="white" size="lg" aria-label='Search database' icon={<RepeatIcon />} />
                <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Filter Results
      </Button>
      <Box ml="2"bg="white" rounded="md" display="flex" direction="row">
                <IconButton onClick={HandleSearch} aria-label='Search database' icon={<SearchIcon />} />
                    {/* <Button colorScheme='teal' onClick={HandleSearch}>Search</Button> */}
                    <PropertySearch setterFunction={setSearchTerms} />
                    </Box>
      <Flex bg="teal" p="1" direction="row" justifyContent="start">
                {pool? <Badge ml="2"bg="teal" color="white" fontSize="md">Pool</Badge>
                : ""}
                {yard? <Badge ml="2"bg="teal" color="white" fontSize="md">Yard</Badge>
                : ""}
                {searchTerms? <Badge ml="2"bg="teal" color="white" fontSize="md">{searchTerms}</Badge>
                :""}
                {square_footage? <Badge ml="2"bg="teal" color="white" fontSize="md">{square_footage} Sq Ft</Badge>
                : ""}
                {bathrooms? <Badge ml="2"bg="teal" color="white" fontSize="md">{bathrooms} bathrooms</Badge>
                : ""}
                {bedrooms? <Badge ml="2"bg="teal" color="white" fontSize="md">{bedrooms} bedrooms</Badge>
                : ""}
                </Flex>
               
                </Flex>
                {mapView ? <Button mr="2" onClick={(event) => HandleMap(event)} >List View</Button>
                    : <Button mr="2" onClick={(event) => HandleMap(event)} >Map View</Button>}
                    </Flex>
              
               
                
                {mapView ? <MapView properties={properties} />
                    :
                    <SimpleGrid p="5" columns={3} spacing={10}>
                    {properties.length ? <>
                        {
                            properties?.map((property) => {
                                return <>
                                   <PropertyBox mapView={mapView}property={property}/>
                                </>

                            })}
                            </>
                            :<Box w="full" mx="auto"><Heading align="center" color="teal"fontFamily="body">No Matching Properties Found</Heading></Box>}

                    </SimpleGrid>}
            </>
        }
    </>

    )
}