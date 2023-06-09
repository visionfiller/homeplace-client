import { getToken } from "./TokenProvider"

export const getAllAreas =() => {
    let token = getToken()
    return fetch("http://localhost:8000/areas", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSingleArea =(id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/areas/${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const addNewArea= (newArea) => {
    let token = getToken()
    return fetch(`http://localhost:8000/areas`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newArea)
    })
        .then(response => response.json())
}