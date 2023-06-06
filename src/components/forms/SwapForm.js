import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getMyProperties, getSingleProperty } from "../manager/PropertyProvider"
import { requestSwap } from "../manager/ReservationProvider"

export const SwapForm =() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const[myProperty, setMyProperty] = useState({})
    const [swapProperty, setSwapProperty] = useState({})
    const {propertyId} = useParams()
    const[reservationDates, setReservationDates] = useState({
        start_date: "",
        end_date: ""
    })
    const navigate = useNavigate()
    useEffect(()=>{
        getSingleProperty(parseInt(propertyId)).then((data) => setSwapProperty(data))
        getMyProperties().then((data)=> setMyProperty(data[0]))
    },[])
    const handleDateForm = (event) => {
        event.preventDefault()
        let copy = {...reservationDates}
        copy[event.target.name] = event.target.value
        setReservationDates(copy)
    }
    const handleSwap = ()=>{
        requestSwap(parseInt(propertyId), reservationDates).then(()=> navigate('/property_list'))
    }
    return <>
    
    <div className="flex row w-3/4 h-1/2 p-10 mx-auto justify-evenly gap-48">
    <div className="w-1/2"><div>{myProperty.address}</div> <img className=""src={myProperty.image}/></div>
    <div className="w-1/2"><div>{swapProperty.address}</div> <img className=""src={swapProperty.image}/></div>
    </div>
    <form>
        <fieldset>
        <label>Start Date</label>
        <input name="start_date"onChange={handleDateForm}type="text"/>
        </fieldset>
        <fieldset>
        <label>End Date</label>
        <input name="end_date" onChange={handleDateForm} type="text"/>
        </fieldset>
    </form>
    <button onClick={handleSwap}>Send Request</button>
    </>
}