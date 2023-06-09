import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllAreas, getAllSingleArea, getSingleArea } from "../manager/AreaProvider"
import { PropertyContext, PropertyProvider } from "../manager/ContextProvider"
import { getAllProperties, getAllPropertiesByFilter, getPropertyByAddress } from "../manager/PropertyProvider"
import { FormFilter } from "./FormFilter"
import { MapView } from "./MapView"
import { PropertySearch } from "./PropertySearch"
import {
    IconButton, Container, Flex, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup,
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
    Input
} from '@chakra-ui/react'
import { StarIcon, SearchIcon, RepeatIcon } from '@chakra-ui/icons'
import { PropertyBox } from "./PropertyBox"
import { getAllPropertyTypes, getSinglePropertyType } from "../manager/PropertyTypeProvider"
import { LoadingScreen } from "../home/LoadingScreen"
import { useMediaQuery } from "@chakra-ui/react"


export const PropertyList = ({ searchTermState }) => {
    const navigate = useNavigate()
    const { properties, setProperties,
        areas, setAreas,
        property_types, setPropertyTypes,
        pool, setPool,
        city, setCity,
        cities,
        yard, setYard,
        searchArea, setSearchArea,
        propertyType, setPropertyType,
        bathrooms, setBathrooms,
        bedrooms, setBedrooms,
        HandleFilter, HandleFilterSubmit, swapper,
        square_footage, setSquareFootage, HomePlaceUserObject } = useContext(PropertyContext)
    const [loading, setLoading] = useState(true)
    const [searchTerms, setSearchTerms] = useState("")
    const [mapView, setMapView] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
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
      
        else {

            showAllProperties()

        }
    }, [])
    const showAllProperties = () => {
        setTimeout(() => {
            const fetchData = async () => {
                try {
                    const data = await getAllProperties();
                    if (swapper.has_listing) {
                        const newData = data.filter(
                            (property) => property.owner.id !== swapper.id
                        );
                        setProperties(newData)
                    }
                    else {
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
                    if (HomePlaceUserObject) {
                        const newData = data.filter(
                            (property) => property.owner.id !== swapper.id
                        );
                        setProperties(newData)
                    }
                    else {
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


    const HandleClearAll = () => {
        setPool(false)
        setYard(false)
        setSquareFootage("")
        setBathrooms("")
        setBedrooms("")
        setSearchArea("")
        setCity("")
        setPropertyType("")
        setSearchTerms("")
        setLoading(true)
        showAllProperties()
    }
    const HandleMap = (event) => {
        event.preventDefault()
        setMapView(!mapView)
    }

    const getPropertyTypeName = (id) => {
        const propertyType = property_types.find((type) => type.id === id);
        if (propertyType) {
            return propertyType.name;
        }
        return ""; // Return an empty string or any default value if the property type is not found
    };
    const getAreaName = (id) => {
        const areaName = areas.find((area) => area.id === id);
        if (areaName) {
            return areaName.neighborhood;
        }
        return ""; // Return an empty string or any default value if the property type is not found
    };
    const getCityName = (id) => {
        const cityName = cities.find((city) => city.id === id);
        if (cityName) {
            return cityName.name;
        }
        return ""; // Return an empty string or any default value if the property type is not found
    };




    return (<>
        {loading ? <LoadingScreen />
            : <>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader align="center">Filter Results</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody  display="flex" direction="column" justifyContent="center"alignItems="center" w="100%" p="2" mx="auto">
                            <FormFilter onClose={onClose} HandleFilter={HandleFilter} HandleFilterSubmit={HandleFilterSubmit} city={city} cities={cities}pool={pool} yard={yard} square_footage={square_footage} searchArea={searchArea} propertyType={propertyType} areas={areas} property_types={property_types} bathrooms={bathrooms} bedrooms={bedrooms} />
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </ModalContent>
                </Modal>
                <Flex bg="teal" justify="space-between" alignItems="center">
                    <Flex bg="teal" p="2" direction="row" justify="start" alignItems="center">
                        <IconButton _hover={{ backgroundColor: "transparent" }} onClick={HandleClearAll} bg="teal" color="white" size="lg" aria-label='Search database' icon={<RepeatIcon />} />
                        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                            Filter Results
                        </Button>
                        <Box ml="2" bg="white" rounded="md" display="flex" direction="row">
                            <IconButton onClick={HandleSearch} aria-label='Search database' icon={<SearchIcon />} />
                            <PropertySearch setterFunction={setSearchTerms} />
                        </Box>
                        {!isMobile ? <>
                            <Flex bg="teal" p="1" direction="row" justifyContent="start">
                                {pool ? <Badge ml="2" bg="teal" color="white" fontSize="md">Pool</Badge>
                                    : ""}
                                {yard ? <Badge ml="2" bg="teal" color="white" fontSize="md">Yard</Badge>
                                    : ""}
                                 {city ? <Badge ml="2" bg="teal" color="white" fontSize="md">{getCityName(parseInt(city))}</Badge>
                                    : ""}
                                {propertyType ? <Badge ml="2" bg="teal" color="white" fontSize="md">{getPropertyTypeName(parseInt(propertyType))}</Badge>
                                    : ""}
                                {searchArea ? <Badge ml="2" bg="teal" color="white" fontSize="md">{getAreaName(parseInt(searchArea))}</Badge>
                                    : ""}
                                {searchTerms ? <Badge ml="2" bg="teal" color="white" fontSize="md">{searchTerms}</Badge>
                                    : ""}
                                {square_footage ? <Badge ml="2" bg="teal" color="white" fontSize="md">{square_footage} Sq Ft</Badge>
                                    : ""}
                                {bathrooms ? <Badge ml="2" bg="teal" color="white" fontSize="md">{bathrooms} bathrooms</Badge>
                                    : ""}
                                {bedrooms ? <Badge ml="2" bg="teal" color="white" fontSize="md">{bedrooms} bedrooms</Badge>
                                    : ""}
                            </Flex>
                        </>
                            : ""}

                    </Flex>
                    {mapView ? <Button mr="2" onClick={(event) => HandleMap(event)} >List View</Button>
                        : <Button mr="2" onClick={(event) => HandleMap(event)} >Map View</Button>}
                </Flex>



                {mapView ? <MapView mapView={mapView} properties={properties} />
                    : <>
                        {isMobile ? <Flex direction="column" p="4">
                            {properties.length ? <>
                                {
                                    properties?.map((property) => {
                                        return <PropertyBox key={property.id} mapView={mapView} property={property} />
                                    })}
                            </>
                                : <Box w="full" mx="auto"><Heading align="center" color="teal" fontFamily="body">No Matching Properties Found</Heading></Box>}
                        </Flex>
                            :
                            <SimpleGrid p="5" columns={3} spacing={2}>
                                {properties.length ? <>
                                    {
                                        properties?.map((property) => {
                                            return <PropertyBox key={property.id}mapView={mapView} property={property} />
                                        })}
                                </>
                                    : <Box w="full" mx="auto"><Heading align="center" color="teal" fontFamily="body">No Matching Properties Found</Heading></Box>}

                            </SimpleGrid>
                        }
                    </>}
            </>
        }
    </>

    )
}