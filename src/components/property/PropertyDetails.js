import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { favoriteProperty, getSingleProperty, unfavoriteProperty } from "../manager/PropertyProvider"
import { getSwapperById } from "../manager/SwapperProvider"
import { Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, Flex,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  IconButton,
  ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { StarIcon, CheckIcon, HeartIcon,ArrowBackIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { RatingForm } from "../forms/ReviewForm"
import { getMySwaps, getSwapByProperty } from "../manager/ReservationProvider"
import { NewPropertyForm } from "./NewPropertyForm"
import { NewHomeModal } from "./NewHomeModal"

export const PropertyDetails = ({ homeProperty }) => {
  const HomePlaceUser = localStorage.getItem("homeplace_user")
  const HomePlaceUserObject = JSON.parse(HomePlaceUser)
  const [property, setProperty] = useState({})
  const [swapper, setSwapper] = useState({})
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const [reviewForm, setReviewForm] = useState(false)
  const [swaps, setSwaps] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  useEffect(() => {
    if (HomePlaceUserObject) {
      getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data))
    }

  }, [])

  useEffect(() => {
    if (propertyId) {
      getPropertyDetail(propertyId)
      if (HomePlaceUserObject) {
        getMySwaps().then((data) => setSwaps(data))
      }
    }
    else {
      setProperty(homeProperty)
    }
  }, [propertyId])

  const getPropertyDetail = (propertyId) => {
    getSingleProperty(parseInt(propertyId)).then((data) => setProperty(data))
  }


  const addFavorite = (id) => {
    favoriteProperty(id).then(() => getPropertyDetail(id))
  }
  const removeFavorite = (id) => {
    unfavoriteProperty(id).then(() => getPropertyDetail(id))
  }
  const swapStatusButton = () => {
    let request = swaps.find((swap) => swap.swapper.id === HomePlaceUserObject.swapper_id)
    if (request) {
      return request
    }

  }
  const swapReceivedButton = (property) => {
    let request = swaps.find((swap) => swap.property.id === property.id )
    if (request) {
      return request
    }

  }
  const handleGoBack = () => {
    navigate(-1);
  };
  return<>
  <Box p="4"w="full" align="left">
    <IconButton _hover={{ backgroundColor: "transparent" }} bg="teal" color="white" size="lg" icon={<ArrowBackIcon/>}onClick={handleGoBack}></IconButton>
    </Box>
    <Box p="10" >
      <Heading fontFamily="body">{property.address}</Heading>

      <Flex direction="row" p="10">
        <Flex direction="column" w="50%">
        <Box  overflow='hidden'>
          <Image src={property.image}  />
          </Box>
          <Box p="10"fontSize="lg" lineHeight="tall">
            <Text>{property.description}</Text>
          </Box>
          </Flex>
  
        
        <Flex direction="column" alignItems='baseline' p="8">
          <Flex direction="row" gap="10">
            <Box
              color="teal"
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='sm'
              textTransform='uppercase'
              ml='2'
            >
              Neighborhood:<br/> {property?.area?.neighborhood}
            </Box>
            <Box
              color="teal"
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='sm'
              textTransform='uppercase'
              ml='2'
            >
              Square Footage:<br/>  {property?.square_footage}
            </Box>
            <Box
              color='teal'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='sm'
              textTransform='uppercase'
              ml='2'
            >
              Homeowner:<br/>  {property?.owner?.full_name}
            </Box>
          </Flex>
          <Box
            pt="4"
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='m'
            textTransform='uppercase'
            ml='2'
          >
            Property Type: {property.property_type?.name}
          </Box>
          <Box

            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='m'
            textTransform='uppercase'
            ml='2'
          >
            Bedrooms: {property.bedrooms}
          </Box>
          <Box

            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='m'
            textTransform='uppercase'
            ml='2'
          >
            Bathrooms: {property.bathrooms}
          </Box>
          <Box
            display="flex"
            gap="2"
            alignItems="center"
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='m'
            textTransform='uppercase'
            ml='2'
          >
            Yard: {property.yard ? <CheckIcon boxSize={5}></CheckIcon> : <CloseIcon boxSize={4}></CloseIcon>}
          </Box>
          <Box
            display="flex"
            gap="2"
            alignItems="center"
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='m'
            textTransform='uppercase'
            ml='2'
          >
            Pool: {property.pool ? <CheckIcon boxSize={5}></CheckIcon> : <CloseIcon boxSize={4}></CloseIcon>}
          </Box>
         
          {/* {HomePlaceUserObject ? <> */}
          {/* {property.user_favorited ? <Button onClick={()=> removeFavorite(property.id)}>Remove From Favorites</Button>
:<Button onClick={()=> addFavorite(property.id)}>Add to Favorites</Button>}
</>
: ""} */}
 <Box p="8">
        {swapStatusButton() ? <Button onClick={()=> navigate("/myswaps")}>Request Sent</Button>
        : <>
          {swapper.has_listing ? <>
            {swapReceivedButton(property) ? <Button onClick={()=> navigate("/myswaps")}>Request Received</Button>
              : <Button colorScheme="teal" size="lg" onClick={() => navigate(`/swap_form/${property.id}`)}> Request a Swap!</Button>}
              </>
            : <>
              <Button  colorScheme='teal' onClick={()=> navigate('/myproperty')}> Add your home to swap!</Button>
              {/* <NewHomeModal isOpen={isOpen} onClose={onClose}/> */}
          
      </>
}
          </>}</Box>


          <Box m="8" p="4" border="1px" borderColor="teal">
            <Heading fontFamily="body" size="lg" as="u">Reviews</Heading>
            {property?.ratings?.length ? property.ratings.map((rating) => {
              return <Box display='flex' mt='2' alignItems='center'>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < Math.round(rating.score / 2) ? 'teal.500' : 'gray.300'}
                    />
                  ))}
                <Box fontFamily="body" as='span' ml='2' color='gray.600' fontSize='sm'>
                  {rating.review}
                </Box>
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                  - {rating.swapper.full_name}
                </Box>
              </Box>
            })
              : <Text p="4">There are no reviews for this property</Text>}
           {HomePlaceUserObject ?
           <>
            {reviewForm ? <RatingForm setReviewForm={setReviewForm} propertyId={propertyId} getPropertyDetail={getPropertyDetail} />
              :  <Button onClick={() => setReviewForm(true)}>Leave a review</Button>}
        </>
        : ""}
          </Box>
        </Flex>
      </Flex>
     



        </Box>
       
</>
}