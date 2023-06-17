import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSwapperById } from "../manager/SwapperProvider"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
  useDisclosure,
  Divider
} from '@chakra-ui/react'

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { PropertyContext } from "../manager/ContextProvider"
import { NewPropertyForm } from "../property/NewPropertyForm"
import { NewHomeModal } from "../property/NewHomeModal"

export const NavBar = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  // const HomePlaceUser = localStorage.getItem("homeplace_user")
  // const HomePlaceUserObject = JSON.parse(HomePlaceUser)
 
  const { swapper,setSwapper, HomePlaceUserObject } = useContext(PropertyContext)

 

 
  useEffect(()=>{
    if (HomePlaceUserObject) {
      getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => {
        setSwapper(data)
      })
      }
    
    
   

  },[])

  const handleLogout = () => {
    localStorage.removeItem("homeplace_user");
    window.location.href = "/login";

  }
  return <>
   
    <Box position="relative"bg="white" px={4} py={2} color="black" borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}>
      <Flex justifyContent="space-between">
        <Link to="/">
          <Text letterSpacing='wide'fontSize="2xl" fontWeight="bold">
            HomePlace
          </Text>
        </Link>
        <Flex gap="16" alignItems="baseline" position="absolute" bottom="0" right="3">
          {swapper.has_listing ? <Link to="/myproperty" ><Text fontWeight='semibold' 
              letterSpacing='wide'
              fontSize='md'
              color="teal"
              textTransform='uppercase'>manage my property</Text></Link> 
            :  <>
            <Link to="/myproperty" colorScheme='teal' onClick={onOpen}><Text fontWeight='semibold'
  
              letterSpacing='wide'
              fontSize='md'
              color="teal"
              textTransform='uppercase'>submit your property</Text></Link>
           
          </>
            
            
            
            
            }
            
      

          <Link mr={4} to="/property_list"><Text fontWeight='semibold'
              letterSpacing='wide'
              fontSize='md'
              color="teal"
              textTransform='uppercase'>List of Properties</Text></Link>
          <Link to="/myswaps"><Text fontWeight='semibold'
              letterSpacing='wide'
              fontSize='md'
              color="teal"
              textTransform='uppercase'>my swaps</Text></Link>


          {/* <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}> */}
            {HomePlaceUserObject ? <>
              <Link onClick={() => handleLogout()}><Text 
              
              letterSpacing='wide'
              fontWeight='semibold'
              fontSize='md'
              color="teal"
              textTransform='uppercase'>logout</Text></Link>
            </>
              : <>
              <ButtonGroup p="2">
                <Button
                size="sm"
                  onClick={() => navigate("/login")}
                 
                  letterSpacing='wide'
                  fontWeight='semibold'
                  fontSize='md'
                  color="teal"
                  textTransform='uppercase'>
                  
                  
                  Sign In
                </Button>
               <Box borderLeft="2px" borderColor="teal"></Box>
                <Button
                  onClick={() => navigate("/register")}
                  size="sm"
                  letterSpacing='wide'
                  fontWeight='semibold'
                  fontSize='md'
                  color="teal"
                  textTransform='uppercase'>
                  
                  
                  Sign up
                </Button>
                </ButtonGroup>
              </>}
          {/* </Stack> */}
        </Flex>
      </Flex>
    </Box>
  </>
}