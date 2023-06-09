import { IconButton, Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { StarIcon, Search2Icon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export const PropertyBox= ({property,mapView, setMyProperties}) => {
 

    return <Box boxShadow="sm" bg="gray.200"height="300px" w="350px" borderWidth='1px' borderRadius='lg' overflow='hidden'>
     
     <Link to={`/property_details/${property.id}`}><Image objectFit="cover"  h="50%" w="full" src={property.image} alt={property.imageAlt} /></Link>

    <Box  p='6'>
      <Box display='flex' alignItems='baseline'>
        
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
      {mapView ? <IconButton bg="transparent"  color="teal"p="8" size="lg" icon={<Search2Icon/>} onClick={() => setMyProperties(property)}></IconButton>
      :"" }
    </Box>

  </Box>
}