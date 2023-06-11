import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { favoriteProperty, getSingleProperty, unfavoriteProperty } from "../manager/PropertyProvider"
import { getSwapperById } from "../manager/SwapperProvider"
import { Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export const PropertyDetails = ({homeProperty}) => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [property, setProperty] = useState({})
    const [swapper, setSwapper] = useState({})
    const {propertyId} = useParams()
    const navigate = useNavigate()
    useEffect(()=> {
      if(HomePlaceUserObject){
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data))}
    },[])

    useEffect(()=> {
        if(propertyId){
       getPropertyDetail(parseInt(propertyId))}
        else{
            setProperty(homeProperty)
        }
    },[propertyId])

    const getPropertyDetail = (propertyId) => {
        getSingleProperty(parseInt(propertyId)).then((data) => setProperty(data))}
    
    const renderStars = (score) => {
        const stars = [];
        for (let i = 0; i < score; i++) {
          stars.push( <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />);
        }
        return stars;
      };
    const addFavorite = (id) => {
        favoriteProperty(id).then(()=> getPropertyDetail(id))
    }
    const removeFavorite =(id) => {
        unfavoriteProperty(id).then(()=> getPropertyDetail(id))
    }
return<>
{HomePlaceUserObject ? <>
{property.user_favorited? <Button onClick={()=> removeFavorite(property.id)}>Remove From Favorites</Button>
:<Button onClick={()=> addFavorite(property.id)}>Add to Favorites</Button>}
</>
: ""}
 <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    <Image src={property.image} alt={property.imageAlt} />

    <Box p='6'>
      <Box display='flex' alignItems='baseline'>
        <Badge borderRadius='full' px='2' colorScheme='teal'>
          New
        </Badge>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          ml='2'
        >
          {property?.area?.neighborhood}
        </Box>
      </Box>

      <Box
        mt='1'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
        noOfLines={1}
      >
        {property.address}
      </Box>

   

     
     {propertyId ?  ""
     :  <Link to={`/property_details/${property.id}`}>See Details</Link>}
    </Box>

  </Box>
           <Box boxSize="50px" display="flex" direction="row">
            {property.pool? <Image  src="https://static.vecteezy.com/system/resources/previews/000/423/067/original/swimming-pool-icon-vector-illustration.jpg"/>
            : ""}
            {property.yard? <Image src="https://cdn2.iconfinder.com/data/icons/real-estate-glyphs/128/8-512.png"/>
            : ""}
            </Box>
            
           <Box>
            <Heading>Reviews</Heading>
           <Box display='flex' mt='2' alignItems='center'>
        {Array(10)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < property?.ratings?.map((rating) => rating.score) ? 'teal.500' : 'gray.300'}
            />
          ))}
        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
          {property.ratings?.map((rating) => rating.review)}
        </Box>
        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
          - {property.ratings?.map((rating) => rating.swapper.full_name)}
        </Box>
      </Box>
</Box>
      {swapper.has_listing ?      <Button onClick={()=> navigate(`/swap_form/${property.id}`)}> Request a Swap!</Button>
      :<Button onClick={()=> navigate(`/newproperty_form`)}> Add your home to swap!</Button>
}
</>
}