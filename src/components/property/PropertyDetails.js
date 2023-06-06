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

    const renderStars = (score) => {
        const stars = [];
        for (let i = 0; i < score; i++) {
          stars.push( <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />);
        }
        return stars;
      };
return<>
{property.user_favorited? <img className="w-10 "src="https://th.bing.com/th/id/OIP.F9B0fBLVndj9JE6Q2RlWuQHaHa?pid=ImgDet&rs=1"/>
:""}
<div className="text-2xl">{property.address}</div>
            <img className="w-1/4 h-1/4 object-cover"src={property.image}/>
            {property.pool? <img className="w-10 m-4" src="https://static.vecteezy.com/system/resources/previews/000/423/067/original/swimming-pool-icon-vector-illustration.jpg"/>
            : ""}
            {property.yard? <img className="w-10 m-4" src="https://cdn2.iconfinder.com/data/icons/real-estate-glyphs/128/8-512.png"/>
            : ""}
            
            <div className="text-xl">Reviews</div>
            <div>
{property?.ratings?.map((rating) => <>
<div>{rating.review}</div>
<div className="rating gap-1">{renderStars(rating.score)}</div>
<div>Reviewed by {rating.swapper.full_name}</div>
</>)
}
</div>
            <button className="btn" onClick={()=> navigate(`/swap_form/${property.id}`)}> Request a Swap!</button>
</>
}