import { Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export const PropertyBox= ({property,mapView}) => {
    return <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
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

   

      {/* <Box display='flex' mt='2' alignItems='center'>
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
      </Box> */}
      <Link to={`/property_details/${property.id}`}>See Details</Link>
    </Box>

  </Box>
}