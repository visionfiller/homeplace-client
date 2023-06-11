import React, { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
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
} from '@chakra-ui/react';



export const Login = ({setToken}) => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setisUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
    
        const user = {
          username: username.current.value,
          password: password.current.value
        }
    
        loginUser(user).then(res => {
        
          if ("valid" in res && res.valid) {
            setToken(res.token, res.swapper_id, res.area_id)
            navigate("/")}
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
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email" >
            <FormLabel>Username</FormLabel>
            <Input type="text" ref={username}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input  ref={password} type="password" />
          </FormControl>
          <Stack spacing={6}>
            {/* <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack> */}
            <Button onClick={handleLogin} type="submit" colorScheme={'blue'} variant={'solid'}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
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

