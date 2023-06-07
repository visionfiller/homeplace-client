import { useEffect, useState } from "react"
import { approveSwap, getMySwapsByStatus, getSwapsBySwapper } from "../manager/ReservationProvider"
import { MyUpcomingSwaps } from "./ApprovedSwaps"
import { MySwaps } from "./MySubmittedSwaps"

export const SwapContainer = () => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [approvedSwaps, setApprovedSwaps] = useState([])
    const [submittedSwaps, setSubmittedSwaps] = useState([])
    const [mySwaps, setMySwaps] = useState([])
    useEffect(() => {
        getAllSwaps()
    }, [])
   


    const getAllSwaps = () => {
        getMySwapsByStatus("submitted").then((data) => { setSubmittedSwaps(data) })
        getMySwapsByStatus("approved").then((data) => { setApprovedSwaps(data) })
        getSwapsBySwapper(parseInt(HomePlaceUserObject.swapper_id)).then((data)=>{ setMySwaps(data)})
    }
    const ApproveSwap=(id)=>{
        approveSwap(id).then(()=> getAllSwaps())
    }

    return <div className="flex row justify-evenly p-10">
        <MySwaps submittedSwaps={submittedSwaps} ApproveSwap={ApproveSwap} />
        <MyUpcomingSwaps mySwaps={mySwaps} approvedSwaps={approvedSwaps}/>
    </div>
}