import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../manager/UserProvider"
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  useColorModeValue,
  Text, Link,
} from '@chakra-ui/react';
import { PropertyContext } from "../manager/ContextProvider";
import { getSwapperById } from "../manager/SwapperProvider";



export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const { setSwapper } = useContext(PropertyContext)
  const [isUnsuccessful, setisUnsuccessful] = useState(false)
  const storedUrl = localStorage.getItem('redirectUrl');

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {

      if ("valid" in res && res.valid) {
        getSwapperById(parseInt(res.swapper_id)).then((data) => { setSwapper(data) })
        setToken(res.token, res.swapper_id, res.area_id)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }



  return (<>
      <Flex
            p="8"
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg="url('https://static.neighborhoods.com/blog/media/shutterstock_1089144251_hero-2b8cf27c75232a4071c87993ce545f42.jpg') center center / cover no-repeat">
            <Box

                position="relative"
               p="2"
                zIndex={1}
                bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)')}
               
                rounded={'lg'}
                boxShadow={'lg'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={4} px={6}>
                    <Stack align={'center'}>
                        <Heading color="teal"fontFamily="body" fontSize={'4xl'} textAlign={'center'}>
                            Sign in
                        </Heading>
                        <Text color="teal"fontFamily="body" fontSize={'lg'} >
                            to start your home swap ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                          

          <FormControl id="email" >
            <FormLabel>Username</FormLabel>
            <Input type="text" ref={username} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input ref={password} type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button onClick={handleLogin} type="submit" 
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'teal.400',
              }}>
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Haven't signed up ? <Link onClick={() => navigate("/register")} color={'blue.400'}>Register</Link>
            </Text>
          </Stack>
          </Stack>
          </Box>
        </Stack>
        </Box>
      </Flex>
      
    

  </>
  )
}

