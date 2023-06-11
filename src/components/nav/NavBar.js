import { useEffect, useState } from "react"
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
  useDisclosure,
} from '@chakra-ui/react'

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'

export const NavBar = () => {
  const navigate = useNavigate()
  const HomePlaceUser = localStorage.getItem("homeplace_user")
  const HomePlaceUserObject = JSON.parse(HomePlaceUser)
  const [swapper, setSwapper] = useState({})

  useEffect(()=> {
    if (HomePlaceUserObject){
      getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data))}
  },[])
  const handleLogout = ()=>{
    localStorage.removeItem("homeplace_user").then(navigate('/login'))

  }
    return <>
     {/* <Flex direction="row">
          <li> <Link to="/">Home</Link></li>
           {swapper.has_listing? <li> <Link to="/myproperty">Manage My Property</Link></li>
           : <li> <Link to="/newproperty_form">Submit my Home</Link></li>  }
           <li> <Link to="/property_list">List of Properties</Link></li>    
           
           <li> <Link to="/myswaps">My Swaps</Link></li>     
      
            <li> <Link  onClick={() =>  {localStorage.removeItem("homeplace_user").then(()=>{navigate("/login") }) }}>Logout</Link></li>

          </Flex> */}
         <Box bg="white" px={4} py={2} color="black" borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}>
      <Flex alignItems="center" justifyContent="space-between">
        <Link to="/">
        <Text fontSize="xl" fontWeight="bold">
          HomePlace
        </Text>
        </Link>
        <Flex gap="8">
        {swapper.has_listing?<Link to="/myproperty">Manage My Property</Link>
           :  <Link to="/newproperty_form">Submit my Home</Link>  }
          <Link mr={4} to="/property_list">List of Properties</Link>   
          <Link to="/myswaps">My Swaps</Link>
         
          
          <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          { HomePlaceUserObject ? <>
          <Link  onClick={handleLogout}>Logout</Link>
          </> 
          : <>
          <Button 
          onClick={()=> navigate("/login")}
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
            Sign In
          </Button>
          <Button
          onClick={()=> navigate("/register")}
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Sign Up
          </Button>
          </> }
        </Stack>
        </Flex>
      </Flex>
    </Box>
    </>
}