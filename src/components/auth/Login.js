import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate} from "react-router-dom"
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
  Text,Link,
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
        getSwapperById(parseInt(res.swapper_id)).then((data) => {setSwapper(data)})
        setToken(res.token, res.swapper_id, res.area_id)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }



  return (<>





    {/* <div className="p-10 w-full">
            <span className="text-8xl" >Welcome to HomePlace</span>
                <form className="" onSubmit={handleLogin}>
                    <fieldset className=" ">
                    <label className="" >username</label>
                            <input type="text"
                                ref={username}
                                className=""
                                placeholder=""
                                required autoFocus />
                    </fieldset>
                    <fieldset className="">
                    
                    <label className="" >password</label>
                            <input type="password"
                               ref={password}
                                className=""
                                placeholder=""
                                required autoFocus />
                          
                    </fieldset>
                    <fieldset className="">
                        <button className="btn" type="submit">
                            Sign in
                        </button>
                        <Link className="" to="/register">Is this your first visit?</Link>
                    </fieldset>
                </form>
      
            </div> */}
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row-reverse' }}>
      <Flex p={8} w="40%" flex={1} align={'center'} justify={'center'}>
        <Stack w="full" spacing={4} maxW={'md'}>
          <Heading fontFamily="body"fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email" >
            <FormLabel>Username</FormLabel>
            <Input type="text" ref={username} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input ref={password} type="password" />
          </FormControl>
          <Stack spacing={6}>
            {/* <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack> */}
            <Button onClick={handleLogin} type="submit"  display={{ base: 'none', md: 'inline-flex' }}
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
                                    Haven't signed up ? <Link onClick={()=> navigate("/register")} color={'blue.400'}>Register</Link>
                                </Text>
                            </Stack>
        </Stack>
      </Flex>
      <Flex w="60%">
        <Image
          opacity="25%"
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://static.neighborhoods.com/blog/media/shutterstock_1089144251_hero-2b8cf27c75232a4071c87993ce545f42.jpg'
          }
        />
      </Flex>
    </Stack>




  </>
  )
}

