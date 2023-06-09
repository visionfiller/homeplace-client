import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getMyProperty, getSingleProperty } from "../manager/PropertyProvider"
import { getSwapByProperty, requestSwap } from "../manager/ReservationProvider"
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
  Container, extendTheme
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
          start_date:date.start_date,
          end_date: date.end_date
        }
        dates.push(dateData)
      })
      
      setUnavailableDates(dates)
    })
  }
  
    else { }
  }, [])

  const tileDisabled = ({ date}, unavailableDates) => {
      // Check if the current date is in the unavailableDates array
      return unavailableDates?.some((unavailableDate) => {
        const startDate = new Date(unavailableDate.start_date);
        const endDate = new Date(unavailableDate.end_date);
        console.log(startDate)
        return date >= startDate && date <= endDate;
    })}

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
    requestSwap(parseInt(propertyId), data).then(() => navigate('/property_list'))
  }

  return <>
    {HomePlaceUserObject.swapper_id ? <>
    {myProperty.address && swapProperty.address ? <>
    <Flex p='10' direction='row'>
    <PropertyBox property={myProperty}/ >
      <Spacer />
    <PropertyBox property={swapProperty}/>
    </Flex>
    </>
    : ""}
   
    <Calendar tileDisabled={({ date}) =>
          tileDisabled({ date}, unavailableDates)
        } tileClassName={tileClassName} selectRange className="w-1/2" onChange={handleDateForm} value={selectedDates}/>
    <div>Selected Dates: {displayDates}</div>
    <button onClick={handleSwap}>Send Request</button>
    </>
    : ""}
    </>
}