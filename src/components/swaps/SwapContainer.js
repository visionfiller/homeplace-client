import { useEffect, useState } from "react"
import { approveSwap, cancelSwap, denySwap, getMySwapsByStatus, getSwapsBySwapper, ownerCompleteSwap, swapperCompleteSwap } from "../manager/ReservationProvider"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    useColorModeValue,
    IconButton,
    Box, Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, Flex
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
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
        getMySwapsByStatus("approved").then((data) => {
            let newData = data.filter((swap) => swap.completed !== true)
            setApprovedSwaps(newData)
        })
        getSwapsBySwapper(parseInt(HomePlaceUserObject.swapper_id)).then((data) => {
            let mySubmitted = data.filter((swap) => swap.status === "Submitted")
            let myApproved = data.filter((swap) => swap.status === "Approved" && swap.completed !== true)
            setMySubmittedSwaps(mySubmitted)
            setMyApprovedSwaps(myApproved)
        })
    }
    const handleCancelSwap = (id) => {
        cancelSwap(id).then(() => getAllSwaps())
    }
    const ApproveSwap = (id) => {
        approveSwap(id).then(() => getAllSwaps())
    }
    const DenySwap = (id) => {
        denySwap(id).then(() => getAllSwaps())
    }
    const handleCompleteOwnerSwap = (id) => {
        ownerCompleteSwap(id).then(() => getAllSwaps())
    }
    const handleCompleteSwapperSwap = (id) => {
        swapperCompleteSwap(id).then(() => getAllSwaps())
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options)
    }

    return <>
        <Flex direction="column" alignItems="center">
            <Heading w="100%" align="center" p="4" fontFamily="body" bg="teal" color="white" size="2xl">HomePlace Swap Portal</Heading>
            <Flex direction={{ base: "column", md: "row" }} gap="16" height="100%" w="100%" p="10" m="8" borderBottom="2px">
                <Box w={{ base: "100%", md: "50%" }}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Heading size="md" align="center" fontFamily="body" p="6">Respond to a Request</Heading>
                    {submittedSwaps ? <>
                        {submittedSwaps.map((swap) => {
                            return <Flex key={swap.id} alignItems="center" direction="column" gap="2">
                                <Box boxSize="250px" h="full">
                                    <Image rounded="md" src={swap.swapper.properties[0].image} />
                                </Box>
                                <Link to={`/property_details/${swap.swapper.properties[0].id}`}> <Badge borderRadius='md' px='2' color="gray">
                                    Details
                                </Badge></Link>
                                <Stat>
                                    <StatNumber fontSize="md">{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatNumber>
                                    <StatHelpText>{swap.swapper.properties[0].address}</StatHelpText>
                                    <StatHelpText>Requested by {swap.swapper.full_name}</StatHelpText>
                                </Stat>

                                <Flex direction="row" alignItems="center" gap="2"><Button onClick={() => ApproveSwap(swap.id)} _hover={{ bg: "green" }} bg="green.400" color="white">Approve</Button> <Button onClick={() => DenySwap(swap.id)} bg="red.400" _hover={{ bg: "red" }} color="white">Deny</Button></Flex>
                            </Flex>
                        })

                        }

                    </>
                        : ""}
                </Box>
                <Box w={{ base: "100%", md: "50%" }}
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Heading size="md" align="center" fontFamily="body" p="6">My Sent Swap Requests</Heading>
                    {mySubmittedSwaps.map((swap) => {
                        return <Flex key={swap.id} alignItems="center" direction="column" gap="2">
                            <Box boxSize="250px" h="full">
                                <Image rounded="md" src={swap.property.image} />
                            </Box>
                            <Link to={`/property_details/${swap.property.id}`}><Badge borderRadius='md' px='2' color="gray">
                                Details
                            </Badge></Link>
                            <Stat>
                                <StatNumber fontSize="md">{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatNumber>
                                <StatHelpText>{swap.property.address}</StatHelpText>
                                <StatHelpText>Sent to {swap.property.owner.full_name}</StatHelpText>
                                <StatLabel><Button size="sm" onClick={() => handleCancelSwap(swap.property.id)}>Cancel</Button></StatLabel>
                            </Stat>
                            <Text size="md" as="b" color={
                                swap.status === "Approved" ? "green"
                                    : "Submitted" ? "yellow.500" : "red"
                            }>{swap.status}</Text>
                        </Flex>
                    })}

                </Box>

            </Flex>

            <Box w={{ base: "100%", md: "50%" }}
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>

                <Heading size="md" align="center" color="teal" fontFamily="body">My Upcoming Swaps</Heading>
                {approvedSwaps.map((swap) => {
                    return <><Flex key={swap.id} direction="column" alignItems="center" gap="2" p="2">
                        <Box boxSize="250px" h="full">
                            <Image rounded="md" src={swap.swapper.properties[0].image} />
                        </Box>
                        <Link to={`/property_details/${swap.swapper.properties[0].id}`}><Badge borderRadius='md' px='2' color="gray">
                            Details
                        </Badge></Link>
                        <Stat>
                            <StatNumber fontSize="md">{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatNumber>
                            <StatHelpText>{swap.swapper.properties[0].address}</StatHelpText>
                            <StatHelpText>Swapped with {swap.swapper.full_name}</StatHelpText>
                        </Stat>
                        <Text size="md" as="b" color={
                            swap.status === "Approved" ? "green"
                                : "Submitted" ? "yellow.500" : "red"
                        }>{swap.status}</Text>
                        <Button onClick={() => handleCompleteOwnerSwap(swap.id)}>Complete Swap</Button>
                        <IconButton aria-label='Search database' icon={<EmailIcon />} onClick={() => window.location = `mailto:${swap.swapper.contact_email}`} />
                    </Flex>

                    </>
                })}

                {/* The swaps that the user has initiated */}
                {myApprovedSwaps.map((swap) => {
                    return <>
                        <Flex key={swap.id} direction="column" alignItems="center" gap="2" p="2">
                            <Box boxSize="250px" h="full">
                                <Image rounded="md" src={swap.property.image} />
                            </Box>
                            <Link to={`/property_details/${swap.property.id}`}><Badge borderRadius='md' px='2' color="gray">
                                Details
                            </Badge></Link>
                            <Stat>
                                <StatNumber fontSize="md">{formatDate(swap.start_date)} - {formatDate(swap.end_date)}</StatNumber>
                                <StatHelpText>{swap.property.address}</StatHelpText>
                                <StatHelpText>Swapped with {swap.property.owner.full_name}</StatHelpText>
                                <StatLabel><Button size="sm" onClick={() => handleCancelSwap(swap.property.id)}>Cancel</Button></StatLabel>
                            </Stat>
                            <Text size="md" as="b" color={
                                swap.status === "Approved" ? "green"
                                    : "Submitted" ? "yellow.500" : "red"
                            }>{swap.status}</Text>
                            <Button onClick={() => handleCompleteSwapperSwap(swap.id)}>Complete Swap</Button>
                            <IconButton aria-label='Search database' icon={<EmailIcon />} onClick={() => window.location = `mailto:${swap.property.owner.contact_email}`} />

                        </Flex>

                    </>
                })}
            </Box>
        </Flex>
    </>
}