import { Route, Routes } from "react-router-dom"
import { SwapForm } from "../forms/SwapForm"
import { Home } from "../home/Home"
import { ManageMyProperty } from "../property/ManageMyProperty"
import { NewPropertyForm } from "../property/NewPropertyForm"
import { PropertyDetails } from "../property/PropertyDetails"
import { PropertyList } from "../property/PropertyList"

export const ApplicationViews = () => {
    return <>
    <Routes>
    <Route path="/" element={ <Home/>} />
        <Route path="/myproperty" element={ <ManageMyProperty/>} />
        <Route path="/property_list" element={ <PropertyList/>} />
        <Route path="/property_details/:propertyId" element={ <PropertyDetails/>} />
        <Route path="/swap_form/:propertyId" element={ <SwapForm/>} />
        <Route path="/newproperty_form" element={ <NewPropertyForm/>} />



        
    </Routes>
    </>
}