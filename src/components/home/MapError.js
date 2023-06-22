import {
    Box,
    Flex,
    Heading,
    Spinner,
    Image
  } from '@chakra-ui/react';
export const MapErrorScreen =() =>{
    return <>
    <Flex p=""h="100%" my="auto"direction="column" alignItems="center">
            <Heading color="teal"fontFamily="body" >Address Not Found On Map</Heading>
<Box p="8" boxSize="md"><Image src="https://th.bing.com/th/id/R.ccd41381cae171d5f2f454054acd8bd5?rik=6c4CpqDqYEPqOg&riu=http%3a%2f%2fwww.signoutfitters.com%2fimages%2fproducts%2fdetail%2fWarningSignRoadClosedw55xxxx.1.png&ehk=rjIFdgIKhjYnqLM1rK8YnwFbCfliMM4GS1y4tAC%2fdLI%3d&risl=&pid=ImgRaw&r=0"/>
</Box>
</Flex>
    </>
}