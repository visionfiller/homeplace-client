import {Button,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { NewPropertyForm } from './NewPropertyForm'

export const NewHomeModal =({isOpen,onClose})=>{
   return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
       
        <ModalContent>
        <ModalHeader mx="auto">Submit New Home</ModalHeader>
     
          <ModalBody>
           
           <NewPropertyForm onClose={onClose}/>
          </ModalBody>

          <ModalFooter>
            
            <Button onClick={()=>onClose()}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
}