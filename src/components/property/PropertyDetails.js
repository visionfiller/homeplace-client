import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { favoriteProperty, getSingleProperty } from "../manager/PropertyProvider"
import { getSwapperById } from "../manager/SwapperProvider"

export const PropertyDetails = ({homeProperty}) => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [property, setProperty] = useState({})
    const [swapper, setSwapper] = useState({})
    const {propertyId} = useParams()
    const navigate = useNavigate()
    useEffect(()=> {
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data) => setSwapper(data))
    },[])
    useEffect(()=> {
        if(propertyId){
       getPropertyDetail(propertyId)}
        else{
            setProperty(homeProperty)
        }
    },[propertyId])

    const getPropertyDetail = (propertyId) => {
        getSingleProperty(parseInt(propertyId)).then((data) => setProperty(data))}
    
    const renderStars = (score) => {
        const stars = [];
        for (let i = 0; i < score; i++) {
          stars.push( <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />);
        }
        return stars;
      };
    const addFavorite = () => {
        favoriteProperty().then(()=> getPropertyDetail())
        
    }
return<>
{property.user_favorited? <img className="w-10 "src="https://th.bing.com/th/id/OIP.F9B0fBLVndj9JE6Q2RlWuQHaHa?pid=ImgDet&rs=1"/>
:<button onClick={()=> addFavorite()}>Add to Favorites</button>}
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
      {swapper.has_listing ?      <button className="btn" onClick={()=> navigate(`/swap_form/${property.id}`)}> Request a Swap!</button>
      :<button className="btn" onClick={()=> navigate(`/newproperty_form`)}> Add your home to swap!</button>
}
</>
}