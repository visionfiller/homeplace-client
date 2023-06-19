import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
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
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSwapperById } from '../manager/SwapperProvider';
  
export const MobileNavBar =()=> {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { swapper,setSwapper, HomePlaceUserObject } = useContext(PropertyContext)
    const navigate = useNavigate()

 

 
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
    
    <Box position="relative"bg="white" px={4} py={1} color="black" borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}>
        <Flex alignItems="center" justifyContent="space-between">
        <IconButton icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}  onClick={isOpen ? onClose : onOpen}/>
        <Link to="/">
          <Text letterSpacing='wide'fontSize="2xl" fontWeight="bold">
            HomePlace
          </Text>
        </Link>
        {HomePlaceUserObject ? <>
              <Link onClick={() => handleLogout()}><Text 
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
                 
                
                  fontWeight='semibold'
                  fontSize='md'
                  color="teal"
                  textTransform='uppercase'>
                  
                  
                  Sign In
                </Button>
               
                </ButtonGroup>
              </>}
        </Flex>
      </Box>
      {isOpen ? (
          <Box rounded="md" zIndex={10} bg="white" w="25%"position="absolute"pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}p="2" >
            {swapper.has_listing ? <Link to="/myproperty" ><Text fontWeight='semibold' 
              letterSpacing='wide'
              fontSize='sm'
              color="teal"
              textTransform='uppercase'>manage my property</Text></Link> 
            :  <>
            <Link to="/myproperty" colorScheme='teal' onClick={onOpen}><Text fontWeight='semibold'
  
              
              fontSize='sm'
              color="teal"
              textTransform='uppercase'>submit your property</Text></Link>
           
          </>
            
            
            
            
            }
            <Link to="/property_list"><Text fontWeight='semibold'
              letterSpacing='wide'
              fontSize='sm'
              color="teal"
              textTransform='uppercase'>List of Properties</Text></Link>
          <Link to="/myswaps"><Text fontWeight='semibold'
              letterSpacing='wide'
              fontSize='sm'
              color="teal"
              textTransform='uppercase'>my swaps</Text></Link>
            </Stack>
          </Box>
        ) : null}
      </>
}