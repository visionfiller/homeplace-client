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
    Stack,
    Container,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'



export const FormFilter = ({event,onClose, areas, property_types, pool, yard, searchArea, square_footage, propertyType, bedrooms, bathrooms, HandleFilter, HandleFilterSubmit }) => {
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',}
   
    return <>
        <Box bg="white" rounded="md" pt="4" border="1px" w="100%">

            <FormControl p="3" w='100%'>



                
                <FormLabel>Area</FormLabel>
                <Select value={searchArea} name="area" onChange={(event) => HandleFilter(event)}>
                    <option>Select an area</option>
                    {areas.map((area) => {
                        return <option key={area.id} value={area.id}>{area.neighborhood}</option>
                    })}
                </Select>
                <FormLabel>Property Type</FormLabel>
                <Select value ={propertyType}name="property_type" onChange={(event) => HandleFilter(event)}>
                    <option>Select a property type</option>
                    {property_types.map((propertyType) => {
                        return <option key={propertyType.id} value={propertyType.id}>{propertyType.name}</option>
                    })}
                </Select>

                <Box>
                    <FormLabel>Home Size</FormLabel>
                    <input className="w-3/4" type="range" min="0" max="10000" id="tempB" onChange={(event) => HandleFilter(event)} name="square_footage" />
                    <FormLabel>{square_footage} Square Feet</FormLabel>
                </Box>
                <Flex direction="column">
                    <Box display="flex">
                        <FormLabel>Min Bathrooms</FormLabel>
                        <Input value={bathrooms}type="number" min="1" max="10" onChange={HandleFilter} name="bathrooms" />
                        </Box>


                    {/* <NumberInput min="1" max="10" onChange={(event) => HandleFilter(event)} name="bathrooms">
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput> */}
                    {/* <Box >
                        <Slider aria-label='slider-ex-6' onChange={(event) => HandleFilter(event)}>
                            <SliderMark value={25} {...labelStyles}>
                                25%
                            </SliderMark>
                            <SliderMark value={50} {...labelStyles}>
                                50%
                            </SliderMark>
                            <SliderMark value={75} {...labelStyles}>
                                75%
                            </SliderMark>
                            <SliderMark
                             name="bathrooms"
                                value={bathrooms}
                                textAlign='center'
                                bg='blue.500'
                                color='white'
                                mt='-10'
                                ml='-5'
                                w='12'
                            >
                                {bathrooms}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box> */}


<Box display="flex">
                        <FormLabel>Min Bedrooms</FormLabel>
                        <Input value={bedrooms}type="number" min="1" max="10" onChange={HandleFilter} name="bedrooms" />
                        </Box>
                </Flex>
                <CheckboxGroup>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox name="pool" type="checkbox" isChecked={pool} onChange={(event) => HandleFilter(event)}>Has Pool?</Checkbox>
                        <Checkbox name="yard" type="checkbox" isChecked={yard} onChange={(event) => HandleFilter(event)}>Has Yard?</Checkbox>
                    </Stack>
                </CheckboxGroup>
                <Box align="center" p ="4">
                <Button onClick={(event) => HandleFilterSubmit(event, pool, yard, searchArea, square_footage, propertyType, bedrooms, bathrooms) & onClose()} className="btn">See Results</Button>
                </Box>
            </FormControl>

        </Box>




        {/* <fieldset>
                    <label>Has Pool</label>
                    <input name="pool" type="checkbox" checked={pool} onChange={HandleFilter}></input>
                </fieldset>
                <fieldset>
                    <label>Has Yard</label>
                    <input name="yard" type="checkbox" checked={yard} onChange={HandleFilter}></input>
                </fieldset>
                <fieldset>
                    <label>Home Size</label>
                    <input className="w-3/4 range-primary" type="range" min="1000" max="10000" id="tempB" onChange={HandleFilter} name="square_footage"  />
                    <div>{square_footage}</div><label>Square Feet</label>
                </fieldset> */}



    </>
}