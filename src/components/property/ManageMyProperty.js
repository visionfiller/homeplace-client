import { useEffect, useState } from "react"
import { deleteProperty, getMyProperties, getMyProperty } from "../manager/PropertyProvider"
import { NewPropertyForm } from "./NewPropertyForm"
import { PropertyBox } from "./PropertyBox"
import { Flex, Button, Box, Heading, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useContext } from "react"
import { PropertyContext } from "../manager/ContextProvider"
import { getSwapperSignedIn } from "../manager/SwapperProvider"


export const ManageMyProperty = () => {
    const [property, setProperties] = useState({})
    const {swapper, setSwapper} = useContext(PropertyContext)

    useEffect(() => {
        
        getSwapperSignedIn().then((data)=> {
        setSwapper(data)
        if (data.has_listing){
            refreshProperty()
        }}
        )
        
    }, [])
    const refreshProperty = () => {
        getMyProperty().then((data) => setProperties(data))
    }

    const deleteMyProperty = (id) => {
        deleteProperty(id).then(() => getMyProperty().then((data) => setProperties(data)))
    }


    return (<>
        {swapper.has_listing ? (
            <Heading bg="teal" color="white" p="4" align="center" fontFamily="body" as="h2" size="2xl">
                Manage Your Home
            </Heading>
        ) : (
            <Heading bg="teal" color="white" p="4" align="center" fontFamily="body" as="h2" size="2xl">
                Submit Your Home
            </Heading>
        )}


        {swapper.has_listing && property.address ? <>
            <Box p="8" align="center"><Button bg="red.600" color='white'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='md'
                textTransform='uppercase'
                my='auto' onClick={() => deleteMyProperty(property.id)}>Delete my property</Button></Box>
            <Flex gap="10" direction={{ base: "column", md: "row-reverse" }} justify="space-evenly" alignItems="center" p="10">

                <Flex p="0" direction="column" alignItems="left">
                    <Heading mx="auto" color="gray.700" fontFamily="body" p="8" size="2xl">My Property</Heading>
                    <PropertyBox property={property} />
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

                    </Box>
                </Flex>

                <NewPropertyForm refreshProperty={refreshProperty} property={property} />

            </Flex>

        </>
            : <Box p="8"> <NewPropertyForm refreshProperty={refreshProperty} /></Box>}



    </>
    )
}
