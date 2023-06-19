import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProperties, getAllPropertiesByFilter, getMyProperties, getPropertyByArea, getPropertyChefs } from "../manager/PropertyProvider";
import { FormFilter } from "../property/FormFilter";
import { PropertyContext } from "../manager/ContextProvider";
import { getSwapperById } from "../manager/SwapperProvider";
import { PropertyBox } from "../property/PropertyBox";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { getAllPropertyTypes } from "../manager/PropertyTypeProvider";
import { LoadingScreen } from "./LoadingScreen";
import { useMediaQuery } from "@chakra-ui/react"


export const Home = () => {
  const [swapper, setSwapper] = useState({});
  const [explore, setExplore] = useState([]);
  const { HomePlaceUserObject,properties, setProperties,
    areas, setAreas, 
    property_types, setPropertyTypes,
    pool, setPool,
    yard, setYard,
    searchArea, setSearchArea,
    propertyType, setPropertyType,
    bathrooms, setBathrooms,
    bedrooms, setBedrooms, 
    square_footage, setSquareFootage, HandleFilter, HandleFilterSubmit, HandleClearAll  } = useContext(PropertyContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(true)
  const [chefs, setChefs]= useState([])
  const [isMobile] = useMediaQuery("(max-width: 768px)") 
  const navigate = useNavigate();
  const btnRef = useRef()

  useEffect(() => {
    if (HomePlaceUserObject) {
      getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data));
      setLoading(false)
    }

    getPropertyChefs().then((data) => setChefs(data))
    setLoading(false)
  }, []);

  useEffect(() => {
    if (swapper.properties > 1) {
      getAllProperties().then((data) => {
        let explorerProperties = data.filter((fil) => fil.area.id !== swapper.properties[0].area.id);
        setExplore(explorerProperties.sort(() => 0.5 - Math.random()).slice(0, 3));
        setLoading(false)
      });
    } else {
 
      getAllProperties().then((data) => setExplore(data.sort(() => 0.5 - Math.random()).slice(0, 3)));
      setLoading(false)
    }
  }, [swapper]);


  return (
    <>{loading ? <LoadingScreen />
        : <>
      <Box bg="teal" height="10px"></Box>
      <Flex w="100%" position="relative" zIndex="1"  bg="url('https://blog.dentalplans.com/wp-content/uploads/2016/05/343829-neighborhood.jpg') center center / cover no-repeat"
        direction={{base:"column", md:"row"}} gap="8" p="8">
        <Box w={{base:"100%", md:"50%"}}>
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.25)"
            zIndex="-1"
          />
          
         {isMobile ? <>
         <Box align="center">
         <Button bg="teal" color="white" onClick={()=> navigate("/property_list")}> Search Homes</Button>
</Box>
           </>
         :""}
        <Stack p={{base:"none", md:"8"}}
          as={Box}
          textAlign={'center'}>
          <Heading 
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" align="center" fontFamily="body" pt="24" color="white" size="4xl"
            fontWeight={600}
           
            fontSize={{ base: '6xl', sm: '2xl', md: '6xl' }}
            lineHeight={'110%'}>
            Welcome to <br />
            <Text
             letterSpacing="wider"
              as={'span'}
              position={'relative'}
              fontSize={{ base: '6xl', sm: '4xl', md: '7xl' }}
              _after={{
                content: "''",
                width: 'full',
                height: ({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.400',
                zIndex: -1,
              }}>
              HomePlace
            </Text>
          </Heading>
         
          <Flex textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" p="2" direction="column">
            <Text align="center" fontSize="xl" color="white" as='b' w="100%">Escape the ordinary, swap homes, unlock adventure.</Text>
            <Text align="center" fontSize="xl" color="white" as='b' w="100%">Begin your ultimate home swapping experience!</Text>
          
          </Flex>
        </Stack>
  
        </Box>
        {!HomePlaceUserObject && (
        //   <Flex pt={{base:"10", md:"36"}} w={{base:"100%", md:"10%"}}>
          <Stack
            direction={{base:'row', md: 'column'}}
            alignItems="center"
    align="{'center'}"
    alignSelf={'center'}>
            <Button
            
            onClick={()=> navigate('/login')}
                size="lg"
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'teal.400',
              }}>
              Get Started
            </Button>
            <Link align="center"onClick={onOpen}><Text color='white'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          ml='2'>Learn more</Text></Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
         
          <ModalCloseButton />
          <ModalBody>
           <Text>Welcome to our innovative home swapping platform! Break free from the mundane and embark on a captivating journey without leaving your city. Experience a refreshing change of scenery by swapping homes with like-minded individuals in your area. Discover new neighborhoods, unlock hidden gems, and create unforgettable memories. Join our community of adventurers and unlock the possibilities of home swapping. If you haven't listed your home yet, seize this opportunity to open doors to new experiences. Start your extraordinary journey today. Welcome to the world of home swapping!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
      
          </ModalFooter>
        </ModalContent>
      </Modal>
            
          </Stack>
        //   </Flex>
          )}
        {isMobile ? ""
        :
        <Box w={{base:"100%", md:"40%"}}>
          <Box position={{base:"none", md:"absolute"}} top="0" right="10" w={{base:"100%", md:"30%"}} align="center">
            <FormFilter HandleFilter={HandleFilter} HandleFilterSubmit={HandleFilterSubmit} pool={pool} yard={yard} square_footage={square_footage} searchArea={searchArea} propertyType={propertyType} areas={areas} property_types={property_types} bathrooms={bathrooms}bedrooms={bedrooms} />
          </Box>
        </Box>
}
      </Flex>
      
          <Heading align="left" bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Explore Other Neighborhoods</Heading>
          {isMobile ? <>
          <Flex direction="column" p="2">
            {explore.map((property) => {
              return <PropertyBox key={property.id}property={property} />;
            })}
            </Flex>
       </>
          : <SimpleGrid p="8" columns={3} spacing={10}>
            {explore.map((property) => {
              return <PropertyBox key={property.id}property={property} />;
            })}
          </SimpleGrid>
}
          <Heading align="left" bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Cook up a storm in these chef's kitchens</Heading>
          {isMobile ? <>
            <Flex direction="column" p="2">
            {chefs.map((property) => {
              return <PropertyBox key={property.id}property={property} />;
            })}
            </Flex>
          </> 
          : <>
          <SimpleGrid p="8" columns={3} spacing={10}>
            {chefs.map((property) => {
              return <PropertyBox key={property.id}property={property} />;
            })}
          </SimpleGrid>
          </>}
       </>}
    </>
  );
};
