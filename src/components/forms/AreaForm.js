import {
    FormControl,
    Box,
    FormLabel,
    Flex,
    Spacer,
    Form,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    Button,
    Select, 
    Checkbox,
    CheckboxGroup,
    Stack,
    Container, extendTheme,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
  } from '@chakra-ui/react'
import { useState } from 'react'
import { addNewArea } from '../manager/AreaProvider'

export const AreaForm = ({isOpen, onClose, getAreas, cities}) => {
    const [area, setArea] = useState({
        neighborhood: "",
        city: 0} )

    const handleAreaForm = (event) => {
        event.preventDefault()
        let copy = {...area}
        copy[event.target.name] = event.target.value
        setArea(copy)
    }
    const handleSubmit =()=> {
        addNewArea(area).then(()=>getAreas()).then(()=>  onClose())
    }
return <>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Area</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Input onChange={handleAreaForm} name='neighborhood' placeholder='What is the name of your neighborhood?'></Input>
           <Select onChange={handleAreaForm} name='city'>
            {cities.map((city)=> {
              return <option value={city.id}>{city.name}</option>
            })}
           </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit} variant='ghost'>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</>
    
}