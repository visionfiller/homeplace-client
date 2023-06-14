import {
    Box,
    Flex,
    Heading,
    Spinner,
    Image
  } from '@chakra-ui/react';
export const LoadingScreen =() =>{
    return <>
    <Flex p="48"h="100%" my="auto"direction="column" alignItems="center">
            <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='teal'
  size='xl'
/><Heading fontFamily="body" >Loading Future Homes...</Heading>
<Box p="8" boxSize="md"><Image src="https://th.bing.com/th/id/R.10d456ad9edf4ed9e137dee9adfa3d44?rik=oi4fBjml5SJ3LQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fhouse-clipart-png-big-image-png-2346.png&ehk=RABtHLWRnK2uVfRKbmydHTUqHe9FWI8tcwVgTY%2bx1Lc%3d&risl=&pid=ImgRaw&r=0"/>
</Box>
</Flex>
    </>
}