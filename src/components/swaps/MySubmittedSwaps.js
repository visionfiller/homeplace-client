import { useEffect, useState } from "react"
import { getPropertyByOwner, getSingleProperty } from "../manager/PropertyProvider"
import { getMySwaps, getMySwapsByStatus } from "../manager/ReservationProvider"

export const MySwaps = ()=> {
    const [submittedSwaps, setSubmittedSwaps] = useState([])
    const [property, setProperty] = useState([])
    useEffect(()=>{
        getMySwapsByStatus("submitted").then((data) => {
         
            setSubmittedSwaps(data)
          })
          
          
    },[])

  //  useEffect(()=>{
  //   if (submittedSwaps.length > 0) {
  //       const fetchProperties = async () => {
  //         const propertyPromises = submittedSwaps.map((swap) =>
  //           getSingleProperty(swap.swapper.properties.map((prop) => prop))
  //         );
  //         const resolvedProperties = await Promise.all(propertyPromises);
  //         setProperties(resolvedProperties);
  //       };
  //       fetchProperties();
  //     }
  //  },[submittedSwaps])


  
    return <>
  <div>Swap Requests</div>
{submittedSwaps.map((swap)=>{
  return <>
  <div key={swap.id}>
  <div>Start Date:{swap.start_date}</div>
  <div>End Date:{swap.end_date}</div>
  {swap.swapper.properties.map((property)=> {
    return <>
    <div>{property.address}</div>
    <img className="w-1/2" src={property.image}/>
    </>
  })}
  </div>
  </>
})}
    
    
  


   
</>

    
}