import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMyProperties, getSingleProperty } from "../manager/PropertyProvider"

export const SwapForm =() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const[myProperty, setMyProperty] = useState({})
    const [swapProperty, setSwapProperty] = useState({})
    const {propertyId} = useParams()
    useEffect(()=>{
        getSingleProperty(parseInt(propertyId)).then((data) => setSwapProperty(data))
        getMyProperties().then((data)=> setMyProperty(data[0]))
    },[])
    return <>
    
    <div className="flex row w-3/4 h-1/2 p-10 mx-auto justify-evenly gap-48">
    <div className="w-1/2"><div>{myProperty.address}</div> <img className=""src={myProperty.image}/></div>
    <div className="w-1/2"><div>{swapProperty.address}</div> <img className=""src={swapProperty.image}/></div>
    </div>
    <form>
        <label>Swap Date Requested </label>
        <input type="date"/>
    </form>
    </>
}