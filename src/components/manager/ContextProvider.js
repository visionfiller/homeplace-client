import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAreas } from "./AreaProvider";
import { getAllPropertiesByFilter } from "./PropertyProvider";
import { getAllPropertyTypes } from "./PropertyTypeProvider";
import { getSwapperById } from "./SwapperProvider";
import {  useDisclosure
} from '@chakra-ui/react';
export const PropertyContext = createContext()
export const PropertyProvider = (props) => {
    const HomePlaceUser = localStorage.getItem("homeplace_user")
    const HomePlaceUserObject = JSON.parse(HomePlaceUser)
    const [properties, setProperties] = useState([])
    const [area, setArea] = useState({});
    const [areas, setAreas] = useState([]);
    const [property_types, setPropertyTypes] = useState([]);
    const [pool, setPool] = useState(false);
    const [yard, setYard] = useState(false);
    const [searchArea, setSearchArea] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [square_footage, setSquareFootage] = useState(false);
    const [ swapper, setSwapper] = useState({})
    const navigate= useNavigate()
  
   
    
    useEffect(()=>{
        
        getAllAreas().then((data) => setAreas(data));
        getAllPropertyTypes().then((data) => setPropertyTypes(data));
    },[])


    const HandleFilterSubmit = (event, pool, yard, searchArea, square_footage, propertyType, bathrooms, bedrooms) => {
        event.preventDefault();
        let url = "";
        if (pool) url += `has_pool&`;
        if (yard) url += `has_yard&`;
        if (square_footage) url += `min_sq_feet=${square_footage}&`;
        if (searchArea) url += `area=${searchArea}&`;
        if (propertyType) url += `property_type=${propertyType}&`;
        if (bathrooms) url += `bathrooms=${bathrooms}&`;
        if (bedrooms) url += `bedrooms=${bedrooms}`;
        else url += "";
        getAllPropertiesByFilter(url).then((data) => {
          setProperties(data);
        }).then(() => {
          
            navigate('/property_list', { searchedproperties: { properties } });
            return;
          
        });
      };
    
      const HandleFilter = (event) => {
        const { name, value, type, checked } = event.target;
        switch (name) {
          case "pool":
            setPool(checked);
            break;
          case "yard":
            setYard(checked);
            break;
          case "bathrooms":
            setBathrooms(parseInt(value));
            break;
          case "bedrooms":
            setBedrooms(parseInt(value));
            break;
          case "square_footage":
            setSquareFootage(parseInt(value));
            break;
          case "area":
            setSearchArea(parseInt(value));
            break;
          case "property_type":
            setPropertyType(parseInt(value));
            break;
          default:
            break;
        }
      };
     
    return (
        <PropertyContext.Provider value={{ 
            properties, setProperties, 
            areas, setAreas, 
            property_types, setPropertyTypes,
            pool, setPool,
            yard, setYard,
            searchArea, setSearchArea,
            propertyType, setPropertyType,
            bathrooms, setBathrooms,
            bedrooms, setBedrooms, 
            square_footage, setSquareFootage, HandleFilterSubmit, HandleFilter, HomePlaceUserObject, swapper, setSwapper}}>
            {props.children}
        </PropertyContext.Provider>
    )
}