import { getToken } from "./TokenProvider"

export const getAllProperties =() => {
    let token = getToken()
    return fetch("http://localhost:8000/properties", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getPropertyByArea =(id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties?area=${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getAllPropertiesWithPool =() => {
    let token = getToken()
    return fetch("http://localhost:8000/properties?has_pool", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSingleProperty =(id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties/${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getMyProperties =() => {
    let token = getToken()
    return fetch("http://localhost:8000/properties/my_properties", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export const addNewProperty= (newProperty) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProperty)
    })
        .then(response => response.json())
}