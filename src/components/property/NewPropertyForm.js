import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { getAllAreas } from "../manager/AreaProvider"
import { addNewProperty, updateProperty } from "../manager/PropertyProvider"

export const NewPropertyForm = ({property}) => {
    const navigate = useNavigate()
    const [areas, setAreas] = useState([])
    const [newProperty, setNewProperty] = useState({
        address: "",
        area: 0,
        square_footage: 0,
        pool: false,
        yard: false,
        image: ""

    })
    useEffect(()=>{
        if(property){
            setNewProperty(property)
        }
        else{
            let copy = {...newProperty}
            setNewProperty(copy)
        }
    },[property])
    useEffect(()=> {
        getAllAreas().then((data)=> setAreas(data))
    },[])

    const HandleControlledInput=(event)=>{
        const copy = {...newProperty}
        if (event.target.name === "area"){
            copy[event.target.name] = areas.find((area) => area.id === parseInt(event.target.value))
        }
        else{
        copy[event.target.name] = event.target.value}
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
            id: newProperty.id,
            address: newProperty.address,
            area: parseInt(newProperty.area.id),
            square_footage: parseInt(newProperty.square_footage),
            pool: newProperty.pool,
            yard: newProperty.yard,
            image: newProperty.image
        }
        if (property) {
            updateProperty(data).then(()=> {
                navigate("/property_list")})
        }
        else{
        
        addNewProperty(data).then(()=> {
            navigate("/property_list")})}
    }
    return <>
    <form>
        {property ?  <h2 className="text-3xl">Manage Your Home</h2>
        : <h2 className="text-3xl">Submit Your Home</h2>}
        <fieldset>
        <label>Address</label>
        <input value = {newProperty.address} name="address" onChange={(event)=> HandleControlledInput(event)} className=" border border-gray-700" type="text" />
        </fieldset>
        <fieldset>
        <select value = {newProperty.area.id} name="area" onChange={(event)=> HandleControlledInput(event)}>
            <option>Select an Area</option>
            {areas.map((area)=> <option key={area.id}value={area.id}>{area.neighborhood}</option>)}
        </select>
        <label> don't see your area? add one here</label>
        </fieldset>
        <fieldset>
        <label>How large is your home?</label>
        <input value = {newProperty.square_footage} name="square_footage" onChange={(event)=> HandleControlledInput(event)} type="number"></input> <label>Square Feet</label>
        </fieldset>
        <fieldset>
            <label>Pool?</label>
            <input checked={newProperty.pool} name="pool" onChange={(event)=> HandleControlledInputChecked(event)}type="checkbox"/>
        </fieldset>
        <fieldset>
            <label>Yard?</label>
            <input checked={newProperty.yard} name="yard" onChange={(event)=> HandleControlledInputChecked(event)} type ="checkbox"/>
            </fieldset>
        <fieldset>
            <label>Upload an image of your home</label>
            <input value={newProperty.image}  name="image" onChange={(event)=> HandleControlledInput(event)}type="text"/>
        </fieldset>
    <button onClick={(event)=> HandleSubmit(event)}>Submit</button>
    </form>
    </>
}