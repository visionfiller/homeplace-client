import { useEffect, useState } from "react"
import { getPropertyByOwner, getSingleProperty } from "../manager/PropertyProvider"
import { getMySwaps, getMySwapsByStatus } from "../manager/ReservationProvider"
import { PropertyBox } from "../property/PropertyBox"

export const MyUpcomingSwaps = ({approvedSwaps,mySwaps})=> {
    
    return<>
    <div className="w-1/2">
     <div className="text 4-xl ">My Swap Requests</div>
    {mySwaps?.map((swap)=>{
       return <>
       <div key={swap.id}>
         <div>Submitted by {swap.swapper.full_name}</div>
       <div>Listed by {swap.property.owner.full_name}</div>
    <button> Cancel</button>
         <div>Start Date:{swap.start_date}</div>
         <div>End Date:{swap.end_date}</div>
         <div className="btn-success">Status: {swap.status}</div>
         {swap.swapper.properties.map((property) => {
           return <>
             <div>{property.address}</div>
             <img className="w-1/2" src={property.image} />
             
           </>
         })}
       </div>
     </>

    })}
   <div className="text 4-xl ">My Approved Swaps</div>
    {approvedSwaps.map((swap) => {
      return <>
        <div key={swap.id}>
          <div>Submitted by {swap.swapper.full_name}</div>
          <div>Start Date:{swap.start_date}</div>
          <div>End Date:{swap.end_date}</div>
          <div className="btn-success">Status: {swap.status}</div>
          {swap.swapper.properties.map((property) => {
            return <>
              <PropertyBox property={property}/>
            </>
          })}
        </div>
      </>
    })}
    </div>
    </>}
