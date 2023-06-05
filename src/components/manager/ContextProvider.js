import { useState, useEffect, createContext } from "react";
export const PropertyContext = createContext()
export const PropertyProvider =(props) => {
    const [properties, setProperties] = useState([])
    return (
        <PropertyContext.Provider value={{properties, setProperties}}>
            {props.children}
        </PropertyContext.Provider>
    )
}