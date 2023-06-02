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