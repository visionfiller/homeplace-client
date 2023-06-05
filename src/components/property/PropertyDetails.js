import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleProperty } from "../manager/PropertyProvider"

export const PropertyDetails = ({homeProperty}) => {
    const [property, setProperty] = useState({})
    const {propertyId} = useParams()
    const navigate = useNavigate()
    useEffect(()=> {
        if(propertyId){
        getSingleProperty(parseInt(propertyId)).then((data) => setProperty(data))}
        else{
            setProperty(homeProperty)
        }
    },[propertyId])
return<>
{property.user_favorited? <img className="w-10 "src="https://th.bing.com/th/id/OIP.F9B0fBLVndj9JE6Q2RlWuQHaHa?pid=ImgDet&rs=1"/>
:""}
<div className="text-2xl">{property.address}</div>
            <img className="w-1/4 h-1/4 object-cover"src={property.image}/>
            {property.pool? <img className="w-10 m-4" src="https://static.vecteezy.com/system/resources/previews/000/423/067/original/swimming-pool-icon-vector-illustration.jpg"/>
            : ""}
            {property.yard? <img className="w-10 m-4" src="https://cdn2.iconfinder.com/data/icons/real-estate-glyphs/128/8-512.png"/>
            : ""}
{property.ratings.map((rating) => <div>{rating.review}</div>)}
            <button onClick={()=> navigate(`/swap_form/${property.id}`)}> Request a Swap!</button>
</>
}