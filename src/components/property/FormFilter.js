import {
    FormControl,
    Box,
    FormLabel,
    Flex,
    Form,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    Button,
    Select,
    Checkbox,
    CheckboxGroup,
    Stack
} from '@chakra-ui/react'



export const FormFilter = ({ event, onClose, city, cities, areas, property_types, pool, yard, searchArea, square_footage, propertyType, bedrooms, bathrooms, HandleFilter, HandleFilterSubmit }) => {
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return <>
        <Box bg="white" rounded="md" pt="4" border="1px" w="100%">
            <FormControl p="3" w='100%'>
                <FormLabel m="0">City</FormLabel>
                <Select value={city} name="city" onChange={(event) => HandleFilter(event)}>
                    <option value="0">Select a city</option>
                    {cities.map((city) => {
                        return <option key={city.id} value={city.id}>{city.name}</option>
                    })}
                </Select>
                <FormLabel m="0">Area</FormLabel>
                <Select value={searchArea} name="area" onChange={(event) => HandleFilter(event)}>
                    <option>Select an area</option>
                    {areas.map((area) => {
                        return <option key={area.id} value={area.id}>{area.neighborhood}</option>
                    })}
                </Select>
                <FormLabel m="0">Property Type</FormLabel>
                <Select value={propertyType} name="property_type" onChange={(event) => HandleFilter(event)}>
                    <option>Select a property type</option>
                    {property_types.map((propertyType) => {
                        return <option key={propertyType.id} value={propertyType.id}>{propertyType.name}</option>
                    })}
                </Select>

                <Box py="2" align="left">
                    
                    <input className="w-3/4" type="range" min="0" max="10000" id="tempB" onChange={(event) => HandleFilter(event)} name="square_footage" />
                    <FormLabel m="0">Home Size: {square_footage} Square Feet</FormLabel>
                </Box>
                <Flex justifyContent="space-evenly" gap="2"direction="column">
                    <Box display="flex" alignItems="center" gap="2">
                        <FormLabel m="0">Min Bath</FormLabel>
                        <Input w="15%" value={bathrooms} type="number" min="1" max="10" onChange={HandleFilter} name="bathrooms" />
                    </Box>



                    <Box display="flex"alignItems="center" gap="2">
                        <FormLabel m="0">Min Bed</FormLabel>
                        <Input w="15%" value={bedrooms} type="number" min="1" max="10" onChange={HandleFilter} name="bedrooms" />
                    </Box>
                </Flex>
                <CheckboxGroup>
                    <Flex justifyContent="space-evenly" gap="2" direction="row">
                        <Checkbox name="pool" type="checkbox" isChecked={pool} onChange={(event) => HandleFilter(event)}>Has Pool?</Checkbox>
                        <Checkbox name="yard" type="checkbox" isChecked={yard} onChange={(event) => HandleFilter(event)}>Has Yard?</Checkbox>
                    </Flex>
                </CheckboxGroup>
                <Box align="center" p="4">
                    <Button onClick={(event) => HandleFilterSubmit(event, pool, yard, city, searchArea, square_footage, propertyType, bedrooms, bathrooms) & onClose()} className="btn">See Results</Button>
                </Box>
            </FormControl>

        </Box>

    </>
}