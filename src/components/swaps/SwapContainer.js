import { useEffect, useState } from "react"
import { approveSwap, cancelSwap, denySwap, getMySwapsByStatus, getSwapsBySwapper } from "../manager/ReservationProvider"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    useColorModeValue,
    Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, Flex
} from '@chakra-ui/react'
import { PropertyBox } from "../property/PropertyBox"
import { Link } from "react-router-dom"


export const SwapContainer = () => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [approvedSwaps, setApprovedSwaps] = useState([])
    const [submittedSwaps, setSubmittedSwaps] = useState([])
    const [mySubmittedSwaps, setMySubmittedSwaps] = useState([])
    const [myApprovedSwaps, setMyApprovedSwaps] = useState([])
    useEffect(() => {
        getAllSwaps()
    }, [])



    const getAllSwaps = () => {
        getMySwapsByStatus("submitted").then((data) => { setSubmittedSwaps(data) })
        getMySwapsByStatus("approved").then((data) => { setApprovedSwaps(data) })
        getSwapsBySwapper(parseInt(HomePlaceUserObject.swapper_id)).then((data) => { 
            let mySubmitted = data.filter((swap) => swap.status === "Submitted")
            let myApproved = data.filter((swap) => swap.status === "Approved")
            setMySubmittedSwaps(mySubmitted) 
            setMyApprovedSwaps(myApproved)})
    }
    const handleCancelSwap = (id) => {
        cancelSwap(id).then(() => getAllSwaps())
    }
    const ApproveSwap = (id) => {
        approveSwap(id).then(() => getAllSwaps())
    }
    const DenySwap = (id)=>{
        denySwap(id).then(() => getAllSwaps())
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options)
    }

    return <>
    <Flex direction="column" alignItems="center">
    <Heading w="100%"align="center"p="4"fontFamily="body" bg="teal" color="white"size="2xl">HomePlace Swap Portal</Heading>
        <Flex direction="row" gap="16" height="100%" w="100%" p="10"m="8" borderBottom="2px">
        <Box    w="50%"
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                <Heading size="md" align="center" fontFamily="body"p="6">Respond to a Request</Heading>
                {submittedSwaps ? <>
                    {submittedSwaps.map((swap) => {
                        return <Flex direction="row" gap="10">
                            <Box boxSize="150px">
                                <Image src={swap.swapper.properties[0].image} />
                            </Box>
                            <Stat>
                                <StatNumber fontSize="md">{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatNumber>
                                <StatHelpText>{swap.swapper.properties[0].address}</StatHelpText>
                                <StatHelpText>Requested by {swap.swapper.full_name}</StatHelpText>
                                <StatLabel><Link to={`/property_details/${swap.swapper.properties[0].id}`}>Details</Link></StatLabel>
                            </Stat>
                          <Flex direction="row" alignItems="center"><Button onClick={()=>ApproveSwap(swap.id)}color="green">Approve</Button><Text>/</Text><Button onClick={()=>DenySwap(swap.id)}color="red">Deny</Button></Flex>
                        </Flex>
                    })
                
                }
               
            </>
                    : ""}
            </Box>
            <Box        w="50%"
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                <Heading size="md" align="center" fontFamily="body" p="4">My Sent Swap Requests</Heading>
                {mySubmittedSwaps.map((swap) => {
                    return <Flex direction="row" gap="10">
                        <Box boxSize="150px">
                            <Image src={swap.property.image} />
                        </Box>
                        <Stat>
                            <StatLabel>Sent to {swap.property.owner.full_name}</StatLabel>
                            <StatNumber>{swap.property.address}</StatNumber>
                            <StatHelpText>{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatHelpText>
                            <StatLabel><Link to={`/property_details/${swap.property.id}`}>Details</Link><Button size="sm" onClick={() => handleCancelSwap(swap.property.id)}>Cancel</Button></StatLabel>
                        </Stat>
                        <Text size="md" as="b"color={
                            swap.status === "Approved" ? "green"
                            : "Submitted" ? "yellow.500" : "red"
                        }>{swap.status}</Text>
                    </Flex>
                })}

            </Box>
         
        </Flex>
       
        <Box   align="center"     w="50%"
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
         <Heading size="md" align="center" color="teal" fontFamily="body">My Upcoming Swaps</Heading>
        {approvedSwaps.map((swap) => {
                    return <><Flex direction="row" gap="10">
                        <Box boxSize="150px">
                            <Image src={swap.property.image} />
                        </Box>
                        <Stat>
                            <StatLabel>Swapped with {swap.swapper.full_name}</StatLabel>
                            <StatNumber>{swap.swapper.properties[0].address}</StatNumber>
                            <StatHelpText>{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatHelpText>
                            <StatLabel><Link to={`/property_details/${swap.swapper.properties[0].id}`}>Details</Link><Button size="sm" onClick={() => handleCancelSwap(swap.swapper.properties[0].id)}>Cancel</Button></StatLabel>
                        </Stat>
                        <Text size="md" as="b"color={
                            swap.status === "Approved" ? "green"
                            : "Submitted" ? "yellow.500" : "red"
                        }>{swap.status}</Text>
                    </Flex>
                    <Button>Complete Swap</Button>
                    </>
                })}

                {/* The swaps that the user has initiated */}
            {myApprovedSwaps.map((swap) => {
                    return <><Flex direction="row" gap="10">
                        <Box boxSize="150px">
                            <Image src={swap.property.image} />
                        </Box>
                        <Stat>
                            <StatLabel>Swapped with {swap.property.owner.full_name}</StatLabel>
                            <StatNumber>{swap.property.address}</StatNumber>
                            <StatHelpText>{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatHelpText>
                            <StatLabel><Link to={`/property_details/${swap.property.id}`}>Details</Link><Button size="sm" onClick={() => handleCancelSwap(swap.property.id)}>Cancel</Button></StatLabel>
                        </Stat>
                        <Text size="md" as="b"color={
                            swap.status === "Approved" ? "green"
                            : "Submitted" ? "yellow.500" : "red"
                        }>{swap.status}</Text>
                    </Flex>
                    <Button>Complete Swap</Button>
                    </>
                })}
                </Box>
                </Flex>
    </>
}