import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Select
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../manager/UserProvider"
import { getAllAreas } from '../manager/AreaProvider';


export const Register = ({ setToken }) => {
    const [user, setUser] = useState({})
    const [areas, setAreas] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate()
    useEffect(()=>{
        getAllAreas().then((data)=> setAreas(data))
    },[])

    const registerNewUser = () => {

        return createUser({
            username: user.username,
            email: user.email,
            area: parseInt(user.area),
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password
        }).then(res => {
            if ("valid" in res && res.valid) {
                setToken(res.token, res.swapper_id, res.area_id)
                navigate("/")
            }
        })

    }




    const handleRegister = (e) => {
        e.preventDefault()
        registerNewUser().then(() => navigate("/"))


    }
    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
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
                            Sign up
                        </Heading>
                        <Text fontFamily="body" fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>

                                <Box fontFamily="body">
                                    <FormControl id="first_name" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input onChange={updateUser} type="text" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="last_name">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input onChange={updateUser} type="text" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="username" isRequired>
                                <FormLabel>Choose a username</FormLabel>
                                <Input onChange={updateUser} type="text" />
                            </FormControl>
                            <FormControl id="area" isRequired>
                               <FormLabel>What neighborhood are you in?</FormLabel>
                                <Select onChange={updateUser} placeholder="">
                                    <option value="0"></option>
                                    {areas.map((area) => {
                                        return <option value={area.id}>{area.neighborhood}</option>
                                    })}

                                </Select>
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input onChange={updateUser} type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={updateUser} type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    onClick={(event) => handleRegister(event)}
                                    loadingText="Submitting"
                                    size="lg"
                                  
                                    colorScheme={'green'}
                                bg={'green.400'}
                                rounded={'full'}
                                px={6}
                                _hover={{
                                  bg: 'teal.400',
                                }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link onClick={()=> navigate("/login")} color={'blue.400'}>Login</Link>
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

