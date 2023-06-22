import {
    Box,
    Flex,
    Heading,
    Spinner,
    Image
  } from '@chakra-ui/react';
export const MapLoadingScreen =() =>{
    return <>
    <Flex p=""h="100%" my="auto"direction="column" alignItems="center">
            <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='teal'
  size='xl'
/><Heading fontFamily="body" >Loading Map...</Heading>
<Box p="8" boxSize="md"><Image src="https://i.pinimg.com/originals/c9/36/57/c93657795343f0d76884270f1cfbb11b.jpg"/>
</Box>
</Flex>
    </>
}