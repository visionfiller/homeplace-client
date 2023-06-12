import { Box,FormControl, Input,Badge, Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, ButtonGroup, Flex } from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'
import { useState } from 'react';
import { rateProperty } from '../manager/PropertyProvider';
export const RatingForm = ({setReviewForm,propertyId, getPropertyDetail}) => {
    const [selectedScore, setSelectedScore] = useState(0);
    const [review, setReview] = useState("")
    const scoreList  = [1,2,3,4,5,6,7,8,9,10]
  const handleScoreSelection = (score) => {
    setSelectedScore(score);
    
  };
  const handleReview=(event)=>{
    setReview(event.target.value)
  }

  const handleSubmitRating = () => {
    let rating = {
        score: selectedScore,
        review: review
    }
    rateProperty(parseInt(propertyId),rating).then(()=> getPropertyDetail(propertyId)).then(()=> setReviewForm(false))

  }
  
    return <>
    <Box>
        <FormControl>
            <Input onChange={(event)=> handleReview(event)} type="text" placeholder="Tell us what you think"/>
            <div>
      {scoreList.map((score) => (
        <StarIcon
          key={score}
          boxSize={6}
          color={score <= selectedScore ? 'yellow.400' : 'gray.400'}
          onClick={() => handleScoreSelection(score)}
          cursor="pointer"
        />
      ))}
    </div>
        </FormControl>
        <Button onClick={handleSubmitRating}>Submit</Button>
    </Box>
    </>
}