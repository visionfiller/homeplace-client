import { getToken } from "./TokenProvider"

export const getAllAreas =() => {
    // let token = getToken()
    return fetch("https://homeplace-server-8a8a3a38456a.herokuapp.com/areas", {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getAllAreasByCity=(id) => {
    // let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/areas?city=${id}`, {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getAllCities =() => {
    // let token = getToken()
    return fetch("https://homeplace-server-8a8a3a38456a.herokuapp.com/cities", {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSingleArea =(id) => {
    // let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/areas/${id}`, {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const addNewArea= (newArea) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/areas`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newArea)
    })
        .then(response => response.json())
}
export const addNewCity= (newCity) => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/cities`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCity)
    })
        .then(response => response.json())
}