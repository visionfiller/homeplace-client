import { IconButton, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { StarIcon, Search2Icon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export const PropertyBox= ({property,mapView, setMyProperties}) => {
  const HomePlaceUser = localStorage.getItem("homeplace_user")
  const HomePlaceUserObject = JSON.parse(HomePlaceUser)

    return <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
     
     <Link to={`/property_details/${property.id}`}><Image  h="50%" w="full" src={property.image} alt={property.imageAlt} /></Link>

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
          {property.area.neighborhood}
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
      <Box display='flex' mt='2' alignItems='center'>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < Math.round(property?.average_rating/2) ? 'teal.500' : 'gray.300'}
            />
          ))}
       
      </Box>
      {mapView ? <IconButton   color="teal"p="8" size="lg" icon={<Search2Icon/>} onClick={() => setMyProperties(property)}></IconButton>
      :"" }
    </Box>

  </Box>
}