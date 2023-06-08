import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getAllSingleArea, getSingleArea } from "../manager/AreaProvider"
import { PropertyContext } from "../manager/ContextProvider"
import { getAllProperties, getAllPropertiesByFilter, getPropertyByAddress } from "../manager/PropertyProvider"
import { FormFilter } from "./FormFilter"
import { MapView } from "./MapView"
import { PropertySearch } from "./PropertySearch"
import { IconButton, Container, Flex, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    SimpleGrid,
Input} from '@chakra-ui/react'
import { StarIcon, SearchIcon } from '@chakra-ui/icons'
import { PropertyBox } from "./PropertyBox"


export const PropertyList = ({ searchTermState }) => {

    const { properties, setProperties } = useContext(PropertyContext)
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [pool, setPool] = useState(false)
    const [yard, setYard] = useState(false)
    const [square_footage, setSquareFootage] = useState("")
    const [loading, setLoading] = useState(true)
    const [searchTerms, setSearchTerms] = useState("")
    const [mapView, setMapView] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    useEffect(() => {
        if (properties.length) {
            setLoading(false)
            return
        }
        else {
            showAllProperties()
        }
    }, [])
    const showAllProperties = () => {
        const fetchData = async () => {
            try {
                const data = await getAllProperties();
                const newData = data.filter(
                    (property) => property.owner.id !== HomePlaceUserObject.swapper_id
                );
                setProperties(newData);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                // Handle the error gracefully, e.g., display an error message
                console.error("Error fetching properties:", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData()
    }

    const HandleSearch = () => {
        if (searchTerms) {
            const fetchData = async () => {
                try {
                    const data = await getPropertyByAddress(searchTerms);
                    const newData = data.filter(
                        (property) => property.owner.id !== HomePlaceUserObject.swapper_id
                    );
                    setProperties(newData);
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

    const HandleFilterSubmit = (event, pool, yard, square_footage) => {
        event.preventDefault()
        let url = ""
        if (pool) {
            url += `has_pool&`

        }
        if (yard) {
            url += `has_yard&`

        }
        if (square_footage) {
            url += `min_sq_feet=${square_footage}&`

        }
        else {
            url += ""

        }
        getAllPropertiesByFilter(url).then((data) => {
            let newData = data.filter((property) => property.owner.id !== HomePlaceUserObject.swapper_id)
            setProperties(newData)
        })
            .then(() => onClose())
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
        }
    }
   
    const HandleClearAll = () => {
        setPool(false)
        setYard(false)
        setSquareFootage("")
        setSearchTerms("")
        showAllProperties()
    }
    const HandleMap = (event) => {
        event.preventDefault()
        setMapView(!mapView)
    }



    return (<>
        {loading ? <Heading >Loading Future Homes...</Heading>
            : <>
       
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Results</DrawerHeader>

          <DrawerBody>
          <FormFilter HandleFilterSubmit={HandleFilterSubmit} square_footage={square_footage} pool={pool} yard={yard} HandleFilter={HandleFilter}  />
                    
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
           <Button colorScheme='blue' onClick={(event)=> HandleFilterSubmit(event, pool, yard, square_footage)} >Apply</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
                <Flex p="8" direction="row" justify="space-between">
                <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Filter Results
      </Button>
      <Box display="flex" direction="row">
                <IconButton onClick={HandleSearch} aria-label='Search database' icon={<SearchIcon />} />
                    {/* <Button colorScheme='teal' onClick={HandleSearch}>Search</Button> */}
                    <PropertySearch setterFunction={setSearchTerms} />
                    </Box>
                </Flex>
               
                {pool? <Badge>Pool</Badge>
                : ""}
                {yard? <Badge>Yard</Badge>
                : ""}
                <Button className="btn" onClick={HandleClearAll}>Back to list</Button>
                {mapView ? <Button className="btn" onClick={(event) => HandleMap(event)} >List View</Button>
                    : <Button className="btn" onClick={(event) => HandleMap(event)} >Map View</Button>}
                {mapView ? <MapView properties={properties} />
                    :
                    <SimpleGrid p="5" columns={3} spacing={10}>

                        {
                            properties?.map((property) => {
                                return <>
                                   <PropertyBox property={property}/>
                                </>

                            })}

                    </SimpleGrid>}
            </>
        }
    </>

    )
}