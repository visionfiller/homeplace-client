import { useEffect, useState } from "react"
import { getPropertyByOwner, getSingleProperty } from "../manager/PropertyProvider"
import { getMySwaps, getMySwapsByStatus } from "../manager/ReservationProvider"

export const MyUpcomingSwaps = ()=> {
    return<></>}
//     const [approvedSwaps, setApprovedSwaps] = useState([])
//     const [properties, setProperties] = useState([])
//     useEffect(()=>{
//         getMySwapsByStatus("approved").then((data) => setApprovedSwaps(data))
//     },[])

//    useEffect(()=>{
//     if (approvedSwaps.length > 0) {
//         const fetchProperties = async () => {
//           const propertyPromises = approvedSwaps.map((swap) =>
//             getSingleProperty(swap.swapper.properties.map((prop) => prop))
//           );
//           const resolvedProperties = await Promise.all(propertyPromises);
//           setProperties(resolvedProperties);
//         };
//         fetchProperties();
//       }
//    },[approvedSwaps])
 
  

  
//     return <>
//   <div>Upcoming Swaps</div>
//   {properties?.map((property) => {
//     return <>
//     <div>{property.address}</div>
//     <img className="w-1/2" src={property.image}/>
    
    
   
//     </>
//   })}

   
// </>

    
// }