import { Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { PropertyList } from "../property/PropertyList"

export const ApplicationViews = () => {
    return <>
    <Routes>
        
        <Route path="/" element={ <Home />} />
        <Route path="/property_list" element={ <PropertyList/>} />
        
    </Routes>
    </>
}