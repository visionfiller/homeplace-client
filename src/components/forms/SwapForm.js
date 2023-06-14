import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getMyProperty, getSingleProperty } from "../manager/PropertyProvider"
import { getSwapByProperty, getSwapBySwapperProperty, requestSwap } from "../manager/ReservationProvider"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { PropertyBox } from "../property/PropertyBox"
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
  Text
} from '@chakra-ui/react'

export const SwapForm = () => {
  const HomePlaceUser = localStorage.getItem("homeplace_user")
  const HomePlaceUserObject = JSON.parse(HomePlaceUser)
  const [myProperty, setMyProperty] = useState({})
  const [swapProperty, setSwapProperty] = useState({})
  const { propertyId } = useParams()
  const [selectedDates, setSelectedDates] = useState([])
  const [displayDates, setDisplayDates] = useState('')
  const [unavailableDates, setUnavailableDates] = useState([])
  const navigate = useNavigate()



  useEffect(() => {
    if (HomePlaceUserObject.swapper_id) {
      getSingleProperty(parseInt(propertyId)).then((data) => setSwapProperty(data))
      getMyProperty().then((data) => setMyProperty(data))
      getSwapByProperty(parseInt(propertyId)).then((data) => {
        let dates = []
        data.map((date) => {
          let dateData = {
            start_date: date.start_date,
            end_date: date.end_date
          }
          dates.push(dateData)
        })

        setUnavailableDates(dates)
      })
      getSwapBySwapperProperty(parseInt(propertyId)).then((data) => {
        let dates = [...unavailableDates]
        data.map((date) => {
          let dateData = {
            start_date: date.start_date,
            end_date: date.end_date
          }
          dates.push(dateData)
        })

        setUnavailableDates(dates)
      })
    }

    else { }
  }, [])
  const customCalendarStyles = {
    // Your custom styles here
    // For example:
    fontFamily: "body",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
    padding: "10px"
  };
  const tileDisabled = ({ date }, unavailableDates) => {
    // Check if the current date is in the unavailableDates array
    return unavailableDates?.some((unavailableDate) => {
      const startDate = new Date(unavailableDate.start_date);
      const endDate = new Date(unavailableDate.end_date);
      console.log(startDate)
      return date >= startDate && date <= endDate;
    })
  }

  const tileClassName = ({ selectedDate, view }) => {
    // Check if the current date is within the selected range
    if (view === 'month' && selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      if (selectedDate >= startDate && selectedDate <= endDate) {
        return 'selected-range';
      }
    }
    return null;
  };
  const handleDateForm = (selectedDate) => {
    setSelectedDates(selectedDate)
    setDisplayDates(formatDates(selectedDate));
    // let copy = {...reservationDates}
    // copy[event.target.name] = new Date(event.target.value)
    // setReservationDates(copy)
  }
  const formatDates = (dates) => {
    if (dates.length === 0) {
      return '';
    } else if (dates.length === 1) {
      return dates[0].toLocaleDateString('en-US');
    } else {
      const startsOn = dates[0].toLocaleDateString('en-US');
      const endsOn = dates[1].toLocaleDateString('en-US');
      return `${startsOn} - ${endsOn}`;
    }
  };
  const handleSwap = () => {
    const startsOn = selectedDates[0]?.toISOString().split('T')[0];
    const endsOn = selectedDates[1]?.toISOString().split('T')[0];

    const data = {
      start_date: startsOn,
      end_date: endsOn,
    };
    requestSwap(parseInt(propertyId), data).then(() => navigate('/myswaps'))
  }
  const handleGoBack = () => {
    navigate(-1);
  };

  return <>
          <Button colorScheme="teal" onClick={handleGoBack}>Back to Details</Button>
    {HomePlaceUserObject.swapper_id ? <>
      <Flex direction="column" alignItems="center" p="">
        {myProperty.address && swapProperty.address ? <>
          <Flex justify="center" p="16" gap="24" direction='row'>

            <Box border="2px" borderColor="teal" p="10" w="50%">
              <Box align="center"
                pb="6"
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='3xl'
                textTransform='uppercase'

              >current:</Box>
              <PropertyBox property={myProperty} /></Box>
            <Box border="2px" borderColor="teal"p="10" w="50%">
              <Box align="center"
                pb="6"
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='3xl'
                textTransform='uppercase'

              >upcoming:</Box><PropertyBox property={swapProperty} /></Box>

          </Flex>
        </>
          : ""}
        <Flex p="4" gap="10" alignItems="center">
  <Box align="center"
                pb="6"
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='3xl'
                textTransform='uppercase'

              >Select dates:<Box align="center"
              pb="6"
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='3xl'
              textTransform='uppercase'> {displayDates}</Box></Box>
        <Box border="1px" borderColor="teal" fontFamily="body"><Calendar tileDisabled={({ date }) =>
          tileDisabled({ date }, unavailableDates)
        } tileClassName={tileClassName} selectRange className="w-1/2" onChange={handleDateForm} value={selectedDates} /></Box>
        
        </Flex>
        <Box >
        <Button size="lg "p="12"onClick={handleSwap}><Text fontSize="lg">Send Request</Text></Button>
        </Box>
      </Flex>
    </>

      : ""}
  </>
}