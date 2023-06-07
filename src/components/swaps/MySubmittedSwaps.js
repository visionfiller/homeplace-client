import { useEffect, useState } from "react"
import { getPropertyByOwner, getSingleProperty } from "../manager/PropertyProvider"
import { getMySwaps, getMySwapsByStatus } from "../manager/ReservationProvider"

export const MySwaps = ({submittedSwaps, ApproveSwap}) => {
  

  return <>
  <div className="w-1/2">
    <div className="text-4xl" >Swap Requests</div>
    {submittedSwaps.map((swap) => {
      return <>
        <div key={swap.id}>
          <div>Submitted by {swap.swapper.full_name}</div>
          <div>Start Date:{swap.start_date}</div>
          <div>End Date:{swap.end_date}</div>
          {swap.swapper.properties.map((property) => {
            return <>
              <div>{property.address}</div>
              <img className="w-1/2" src={property.image} />
            </>
          })}
        </div>
        <button onClick={()=> ApproveSwap(swap.id)}className="btn btn-accent">Approve</button>
        <button className="btn btn-warning">Deny</button>
        
      </>

    })}
    </div>
  </>
}