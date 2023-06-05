import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllSingleArea, getSingleArea } from "../manager/AreaProvider"
import { PropertyContext } from "../manager/ContextProvider"
import { getAllProperties, getAllPropertiesByFilter, getPropertyByAddress} from "../manager/PropertyProvider"
import { FormFilter } from "./FormFilter"
import { PropertySearch } from "./PropertySearch"

export const PropertyList = ({searchTermState}) => {
   
    const {properties, setProperties} = useContext(PropertyContext)
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [pool, setPool] = useState(false)
    const [yard, setYard] = useState(false)
    const [square_footage, setSquareFootage] = useState("")
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState(false)
    const [searchTerms, setSearchTerms] = useState("")

    useEffect(() => {
       if (properties.length) {
            setLoading(false)
            return
       }
       else {
       showAllProperties()}
    }, [])
    const showAllProperties=()=>{
        const fetchData = async () => {
            try {
                const data = await getAllProperties();
                const newData = data.filter(
                    (property) => property.owner.id !== HomePlaceUserObject.swapper_id
                );
                setProperties(newData);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                // Handle the error gracefully, e.g., display an error message
                console.error("Error fetching properties:", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData()}
    
 

    // useEffect(
    //     () => {
    //             if (searchTerms) {
    //                 const fetchData = async () => {
    //                     try {
    //                         const data = await getPropertyByAddress(searchTerms);
    //                         const newData = data.filter(
    //                             (property) => property.owner.id !== HomePlaceUserObject.swapper_id
    //                         );
    //                         setProperties(newData);
    //                         setLoading(false); // Set loading to false once data is fetched
    //                     } catch (error) {
    //                         // Handle the error gracefully, e.g., display an error message
    //                         console.error("Error fetching properties:", error);
    //                         setLoading(false); // Set loading to false in case of error
    //                     }
    //                 };
            
    //                 fetchData()}
    //     },
    //     [searchTerms]
    // )
    const HandleSearch =()=> {
        if (searchTerms) {
            const fetchData = async () => {
                try {
                    const data = await getPropertyByAddress(searchTerms);
                    const newData = data.filter(
                        (property) => property.owner.id !== HomePlaceUserObject.swapper_id
                    );
                    setProperties(newData);
                    setLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    // Handle the error gracefully, e.g., display an error message
                    console.error("Error fetching properties:", error);
                    setLoading(false); // Set loading to false in case of error
                }
            };
    
            fetchData()}
    }

    const HandleFilterSubmit = (event, pool, yard, square_footage) => {
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
        else {
         url += ""
            
        }
        getAllPropertiesByFilter(url).then((data)=> {
        let newData = data.filter((property) => property.owner.id !== HomePlaceUserObject.swapper_id)
        setProperties(newData)})
        .then(()=> setForm(false))
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
        }
    }
    const HandleFilterForm = (event) => {
        event.preventDefault()
        setForm(true)
    }
    const HandleFilterFormClose = (event) => {
        event.preventDefault()
        setForm(false)
    }
    const HandleClearAll = () => {
        setPool(false)
        setYard(false)
        setSquareFootage("")
        setSearchTerms("")
        showAllProperties()
    }


    return (<>
        {loading ? <div className="text-4xl text-center h-full my-auto"> Loading Future Homes...</div>
            : <>
                <div className="flex row items-center">
                <button className="btn btn-small"onClick={HandleSearch}>Search</button>
               <PropertySearch setterFunction={setSearchTerms}/>
            </div>
                <button onClick={(event) => HandleFilterForm(event)} className="btn">
                    Filter Results
                </button>
                <button className="badge badge-lg">{pool? "Pool": ""}</button>
                <button>{yard? "Yard": ""}</button>
                <button>{square_footage?   `Minimum Square Feet ${square_footage}`: ""}</button>
                {form ? <FormFilter HandleFilterSubmit={HandleFilterSubmit} square_footage={square_footage} pool={pool} yard={yard} HandleFilter={HandleFilter} HandleFilterFormClose={HandleFilterFormClose} />
                    : ""}
                <button onClick={HandleClearAll}>Back to list</button>
                <div className="p-10 flex flex-col">
                    {
                        properties?.map((property) => {
                            return <Link key={property.id} to={`/property_details/${property.id}`}>
                                <div key={property.id}>{property.address}</div>
                                <div>Neighborhood:{property.area.neighborhood}</div>
                                <img className="w-1/4 h-1/4 object-cover" src={property.image} />
                            </Link>

                        })}

                </div>
            </>
        }
    </>

    )
}