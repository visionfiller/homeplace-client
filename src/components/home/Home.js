import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAreas, getSingleArea } from "../manager/AreaProvider";
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
  useColorModeValue,
  useBreakpointValue,
  Spacer,
  Container,
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

export const Home = () => {
//   const HomePlaceUser = localStorage.getItem("homeplace_user");
//   const HomePlaceUserObject = JSON.parse(HomePlaceUser);
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
//   const [area, setArea] = useState({});
//   const [areas, setAreas] = useState([]);
//   const [property_types, setPropertyTypes] = useState([]);
//   const [pool, setPool] = useState(false);
//   const [yard, setYard] = useState(false);
//   const [searchArea, setSearchArea] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [bathrooms, setBathrooms] = useState("");
//   const [bedrooms, setBedrooms] = useState("");
//   const [square_footage, setSquareFootage] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(true)
  const [chefs, setChefs]= useState([])

  const navigate = useNavigate();

  useEffect(() => {
    if (HomePlaceUserObject) {
      getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data));
      setLoading(false)
    }
    // getAllAreas().then((data) => setAreas(data));
    // getAllPropertyTypes().then((data) => setPropertyTypes(data));
    getPropertyChefs().then((data) => setChefs(data))
    setLoading(false)
  }, []);

  useEffect(() => {
    if (swapper.properties > 1) {
    //   getPropertyByArea(swapper.properties[0].area.id).then((data) => setHomeProperties(data));
    //   getSingleArea(swapper.properties[0].area.id).then((data) => setArea(data));
      getAllProperties().then((data) => {
        let explorerProperties = data.filter((fil) => fil.area.id !== swapper.properties[0].area.id);
        setExplore(explorerProperties.sort(() => 0.5 - Math.random()).slice(0, 3));
        setLoading(false)
      });
    } else {
    //   getPropertyByArea(1).then((data) => setHomeProperties(data));
    //   getSingleArea(1).then((data) => setArea(data));
      getAllProperties().then((data) => setExplore(data.sort(() => 0.5 - Math.random()).slice(0, 3)));
      setLoading(false)
    }
  }, [swapper]);

//   const HandleFilterSubmit = (event, pool, yard, searchArea, square_footage, propertyType, bathrooms, bedrooms) => {
//     event.preventDefault();
//     let url = "";
//     if (pool) url += `has_pool&`;
//     if (yard) url += `has_yard&`;
//     if (square_footage) url += `min_sq_feet=${square_footage}&`;
//     if (searchArea) url += `area=${searchArea}&`;
//     if (propertyType) url += `property_type=${propertyType}&`;
//     if (bathrooms) url += `bathrooms=${bathrooms}&`;
//     if (bedrooms) url += `bedrooms=${bedrooms}`;
//     else url += "";
//     getAllPropertiesByFilter(url).then((data) => {
//       setProperties(data);
//     }).then(() => {
//       if (properties.length) {
//         navigate('/property_list', { searchedproperties: { properties } });
//         return;
//       }
//     });
//   };

//   const HandleFilter = (event) => {
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

  return (
    <>{loading ? <LoadingScreen />
        : <>
      <Box bg="teal" height="10px"></Box>
      <Flex w="100%" position="relative" zIndex="1" display="flex" bg="url('https://blog.dentalplans.com/wp-content/uploads/2016/05/343829-neighborhood.jpg') center center / cover no-repeat"
        direction="row" gap="8" p="8">
        <Box w="50%">
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.25)"
            zIndex="-1"
          />
         
        <Stack p="8"
          as={Box}
          textAlign={'center'}>
          <Heading 
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" align="center" fontFamily="body" pt="24" color="white" size="4xl"
            fontWeight={600}
           
            fontSize={{ base: 'xl', sm: '2xl', md: '6xl' }}
            lineHeight={'110%'}>
            Welcome to <br />
            <Text
             letterSpacing="wider"
              as={'span'}
              position={'relative'}
              fontSize={{ base: '2xl', sm: '4xl', md: '7xl' }}
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
          <Flex pt="36"w="10%">
          <Stack
            
            direction={'column'}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
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
            <Link onClick={onOpen}><Text color='white'
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
          </Flex>)}
        <Box w="40%">
          <Box position="absolute" top="0" right="10" w="30%" align="center">
            <FormFilter HandleFilter={HandleFilter} HandleFilterSubmit={HandleFilterSubmit} pool={pool} yard={yard} square_footage={square_footage} searchArea={searchArea} propertyType={propertyType} areas={areas} property_types={property_types} bathrooms={bathrooms}bedrooms={bedrooms} />
          </Box>
        </Box>
      </Flex>
      
          <Heading align="left" bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Explore Other Neighborhoods</Heading>
          <SimpleGrid p="8" columns={3} spacing={10}>
            {explore.map((property) => {
              return <PropertyBox property={property} />;
            })}
          </SimpleGrid>
          <Heading align="left" bg="teal" color="white" fontFamily="body" p="4" size="md" w="100%">Cook up a storm in these chef's kitchens</Heading>
          <SimpleGrid p="8" columns={3} spacing={10}>
            {chefs.map((property) => {
              return <PropertyBox property={property} />;
            })}
          </SimpleGrid>
       </>}
    </>
  );
};
