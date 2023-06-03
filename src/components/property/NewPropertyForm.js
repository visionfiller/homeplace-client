import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { getAllAreas } from "../manager/AreaProvider"
import { addNewProperty } from "../manager/PropertyProvider"

export const NewPropertyForm = () => {
    const navigate = useNavigate()
    const [areas, setAreas] = useState([])
    const [newProperty, setNewProperty] = useState({
        address: "",
        area: 0,
        square_footage: 0,
        has_pool: false,
        has_yard: false,
        image: ""

    })
    useEffect(()=> {
        getAllAreas().then((data)=> setAreas(data))
    },[])

    const HandleControlledInput=(event)=>{
        const copy = {...newProperty}
      
        copy[event.target.name] = event.target.value
        setNewProperty(copy)
    }
    const HandleControlledInputChecked=(event)=>{
        const copy = {...newProperty}
      
        copy[event.target.name] = event.target.checked
        setNewProperty(copy)
    }
    const HandleSubmit =(event) => {
        event.preventDefault()
        let data = {
            address: newProperty.address,
            area: parseInt(newProperty.area),
            square_footage: parseInt(newProperty.square_footage),
            pool: newProperty.has_pool,
            yard: newProperty.has_yard,
            image: newProperty.image
        }
        addNewProperty(data).then(()=> {
            navigate("/property_list")})
    }
    return <>
    <form>
        <h2 className="text-3xl">Submit Your Home</h2>
        <fieldset>
        <label>Address</label>
        <input name="address" onChange={(event)=> HandleControlledInput(event)} className=" border border-gray-700" type="text" />
        </fieldset>
        <fieldset>
        <select name="area" onChange={(event)=> HandleControlledInput(event)}>
            <option>Select an Area</option>
            {areas.map((area)=> <option key={area.id}value={area.id}>{area.neighborhood}</option>)}
        </select>
        <label> don't see your area? add one here</label>
        </fieldset>
        <fieldset>
        <label>How large is your home?</label>
        <input name="square_footage" onChange={(event)=> HandleControlledInput(event)} type="number"></input> <label>Square Feet</label>
        </fieldset>
        <fieldset>
            <label>Pool?</label>
            <input name="has_pool" onChange={(event)=> HandleControlledInputChecked(event)}type="checkbox"/>
        </fieldset>
        <fieldset>
            <label>Yard?</label>
            <input name="has_yard" onChange={(event)=> HandleControlledInputChecked(event)} type ="checkbox"/>
            </fieldset>
        <fieldset>
            <label>Upload an image of your home</label>
            <input name="image" onChange={(event)=> HandleControlledInput(event)}type="text"/>
        </fieldset>
    <button onClick={(event)=> HandleSubmit(event)}>Submit</button>
    </form>
    </>
}