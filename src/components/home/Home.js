import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllAreas, getSingleArea } from "../manager/AreaProvider"
import { getAllPropertiesByFilter, getMyProperties, getPropertyByArea } from "../manager/PropertyProvider"
import { FormFilter } from "../property/FormFilter"
import { PropertyContext } from "../manager/ContextProvider"
import { getSwapperById } from "../manager/SwapperProvider"

export const Home =() => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [swapper,setSwapper] = useState({})
    const [homeProperties, setHomeProperties] = useState([])
    const {properties, setProperties} = useContext(PropertyContext)
    const[area, setArea] = useState({})
    const [areas, setAreas] = useState([])
    const [pool, setPool] = useState(false)
    const [yard, setYard] = useState(false)
    const [searchArea, setSearchArea] = useState("")
    const [square_footage, setSquareFootage] = useState(false)
    
    const navigate = useNavigate()
    useEffect(()=>{
        getSwapperById(parseInt(HomePlaceUserObject.swapper_id)).then((data)=> setSwapper(data))
        getAllAreas().then((data)=> setAreas(data))
    },[])
    useEffect(() => {
        if (swapper.properties > 0){
    getPropertyByArea(swapper.properties[0].area.id).then((data) => setHomeProperties(data))
    getSingleArea(swapper.properties[0].area.id).then((data) => setArea(data))}
    else{
        getPropertyByArea(1).then((data) => setHomeProperties(data))
        getSingleArea(1).then((data) => setArea(data))
    }
    

   
    },[swapper])
    const HandleFilterSubmit = (event, pool, yard, searchArea, square_footage) => {
        event.preventDefault()
        let url=""
        if (pool) {
            url += `has_pool&`
            
        }
         if (yard) {
            url += `has_yard&`
           
        }
         if (square_footage) {
            url += `min_sq_feet=${square_footage}&`
            
        }
        if (searchArea) {
            url += `area=${searchArea}`
        }
        else {
         url += ""
            
        }
        getAllPropertiesByFilter(url).then((data)=> {
        setProperties(data)})
        .then(()=> navigate('/property_list', {searchedproperties:{properties}}))
    }
    const HandleFilter = (event) => {
        switch (event.target.name) {
            case "pool":
                setPool(event.target.checked)
                break
            case "yard":
                setYard(event.target.checked)
                break
            case "square_footage":
                setSquareFootage(parseInt(event.target.value))
                break
            case "area":
                setSearchArea(parseInt(event.target.value))
                break
        }
    }
    
    
    
    
        return (<>
        <div className="text-6xl">Welcome to HomePlace!</div>
       <div className="flex row p-8">
        <div className="w-1/2">
        <button>How it works</button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus. Fermentum leo vel orci porta non pulvinar. Sollicitudin ac orci phasellus egestas tellus. Eget sit amet tellus cras adipiscing enim. Pellentesque dignissim enim sit amet. Viverra nibh cras pulvinar mattis. Lacus luctus accumsan tortor posuere ac ut consequat. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Et leo duis ut diam quam nulla. Ut etiam sit amet nisl purus in mollis nunc sed. Euismod elementum nisi quis eleifend. Massa tincidunt nunc pulvinar sapien et ligula. Sed felis eget velit aliquet sagittis id consectetur purus ut. At tellus at urna condimentum. Tincidunt id aliquet risus feugiat in ante metus dictum at. Tellus in hac habitasse platea.</p>
        </div>
        <div className="w-1/2">
            <div className="text-center">Find your next staycation</div>
            <form className="bg-white w-4/5 h-full md:w-1/2 md:h-full mx-auto my-10 rounded-lg border-secondary border-2 p-2">
                
                <fieldset>
                    <label>Has Pool</label>
                    <input name="pool" type="checkbox" checked={pool} onChange={HandleFilter}></input>
                </fieldset>
                <fieldset>
                    <label>Has Yard</label>
                    <input name="yard" type="checkbox" checked={yard} onChange={HandleFilter}></input>
                </fieldset>
                <fieldset>
                    <label>Area</label>
                    <select name="area" onChange={HandleFilter}>
                        <option>Select an area</option>
                        {areas.map((area) => {
                            return <option key= {area.id} value={area.id}>{area.neighborhood}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Home Size</label>
                    <input className="w-3/4" type="range" min="1000" max="10000" id="tempB" onChange={HandleFilter} name="square_footage"  />
                    <div>{square_footage}</div><label>Square Feet</label>
                </fieldset>
                <button onClick={(event)=> HandleFilterSubmit(event, pool, yard, searchArea, square_footage)} className="btn">See Results</button>
            </form>
         
        </div>
        </div>
        




        {swapper !== "" ? <>
        <div>Showing properties in {area.neighborhood}</div>
        <div className="flex row p-8">
        {
        homeProperties.map((property) => {
        return <Link className="w-full" key={property.id} to={`/property_details/${property.id}`}>
                <div key={property.id}>{property.address}</div>
                <img className="w-1/4 h-auto"src={property.image}/>
                </Link>
        })}
            
        </div>
        </>
        : ""}
        </>
        )
    }
