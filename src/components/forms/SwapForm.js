import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getMyProperties, getSingleProperty } from "../manager/PropertyProvider"
import { getSwapByProperty, requestSwap } from "../manager/ReservationProvider"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export const SwapForm =() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const[myProperty, setMyProperty] = useState({})
    const [swapProperty, setSwapProperty] = useState({})
    const {propertyId} = useParams()
    const[selectedDates, setSelectedDates] = useState([])
    const [displayDates, setDisplayDates] = useState('')
    const [unavailableDates, setUnavailableDates] = useState([])
    const navigate = useNavigate()



    useEffect(()=>{
        getSingleProperty(parseInt(propertyId)).then((data) => setSwapProperty(data))
        getMyProperties().then((data)=> setMyProperty(data[0]))
        getSwapByProperty(parseInt(propertyId)).then((data) => setUnavailableDates(data))
    },[])
    
    // const tileDisabled = ({ date }) => {
    //     // Check if the current date is in the unavailableDates array
    //     return unavailableDates.some((unavailableDate) => {
    //       return date.toDateString() === unavailableDate.toDateString();
    //     });
    //   };
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
    const handleSwap = ()=>{
        const startsOn = selectedDates[0]?.toISOString().split('T')[0];
    const endsOn = selectedDates[1]?.toISOString().split('T')[0];

    const data = {
      start_date: startsOn,
      end_date: endsOn,
    };
        requestSwap(parseInt(propertyId), data).then(()=> navigate('/property_list'))
    }
    
    return <>
    
    <div className="flex row w-3/4 h-1/2 p-10 mx-auto justify-evenly gap-48">
    <div className="w-1/2"><div>{myProperty.address}</div> <img className=""src={myProperty.image}/></div>
    <div className="w-1/2"><div>{swapProperty.address}</div> <img className=""src={swapProperty.image}/></div>
    </div>
    <Calendar tileClassName={tileClassName} selectRange className="w-1/2" onChange={handleDateForm} value={selectedDates}/>
    <div>Selected Dates: {displayDates}</div>
    <button onClick={handleSwap}>Send Request</button>
    </>
}