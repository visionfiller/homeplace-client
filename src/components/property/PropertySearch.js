import { Input } from '@chakra-ui/react'
export const PropertySearch = ({ setterFunction }) => {
    return (
            <Input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="1234 Sesame Way"/>
        
    )
    
    }