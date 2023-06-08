import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UploadWidget } from "../cloudinary/UploadWidget"
import { getAllAreas } from "../manager/AreaProvider"
import { addNewProperty, updateProperty } from "../manager/PropertyProvider"

export const NewPropertyForm = ({property}) => {
    const navigate = useNavigate()
    const [areas, setAreas] = useState([])
    const [url, setURL] = useState("")
    const [error, updateError] = useState("");
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

    function handleOnUpload(error, result, widget) {
        if ( error ) {
          updateError(error);
          widget.close({
            quiet: true
          });
          return;
        }
        setURL(result?.info?.secure_url)
       
      }
      const HandleControlledInputChangeCustomer = (url) => {
        const copy = {...newProperty}
        copy.image = url
        setNewProperty(copy)
    }
    
      useEffect(
        () => {
            if(url !== ""){
                HandleControlledInputChangeCustomer(url)
                
                }
    
    
        },[url])
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
            <fieldset className="p-4 mx-auto flex row justify-evenly items-center">
                {url === "" ? ""
                :  <img className="h-1/3 w-1/3" src={url}/>}
                
                <UploadWidget onUpload={handleOnUpload}/>
               

       
                    {/* <input 
                onChange={HandleControlledInputChange}
                      defaultValue={user.profilePicture}
                        type="text"id="profilePicture" className="input input-bordered input-md"
                        placeholder="URL" name="profilePicture"required />
                        */}

                </fieldset>
    <button onClick={(event)=> HandleSubmit(event)}>Submit</button>
    </form>
    </>
}