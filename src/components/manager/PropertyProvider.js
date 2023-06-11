import { getToken } from "./TokenProvider"

export const getAllProperties =() => {
    // let token = getToken()
    return fetch("http://localhost:8000/properties", {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export const getPropertyByArea =(id) => {
    // let token = getToken()
    return fetch(`http://localhost:8000/properties?area=${id}`, {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getPropertyByOwner =(id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties?owner=${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getPropertyByAddress =(address) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties?address=${address}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
// export const getAllPropertiesWithPool =() => {
//     let token = getToken()
//     return fetch("http://localhost:8000/properties?has_pool", {
//         headers:{
//             "Authorization": `Token ${token}`,
//              "Content-Type": "application/json"
//         }
//     })
//         .then(response => response.json())
// }
// export const getAllPropertiesWithYard =() => {
//     let token = getToken()
//     return fetch("http://localhost:8000/properties?has_yard", {
//         headers:{
//             "Authorization": `Token ${token}`,
//              "Content-Type": "application/json"
//         }
//     })
//         .then(response => response.json())
// }
export const getAllPropertiesByFilter =(filter) => {
    // let token = getToken()
    return fetch(`http://localhost:8000/properties?${filter}` , {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSingleProperty =(id) => {
    // let token = getToken()
    return fetch(`http://localhost:8000/properties/${id}`, {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getMyProperty =() => {
    let token = getToken()
    return fetch("http://localhost:8000/properties/my_property", {
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
export const favoriteProperty= (id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties/${id}/favorite`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const unfavoriteProperty= (id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties/${id}/unfavorite`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
        
}
export const updateProperty = (property) =>{
    let token = getToken()
    return fetch(`http://localhost:8000/properties/${property.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    })
       
}
export const deleteProperty = (id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
}
export const getLatAndLong = (address) => {
    return fetch (`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`)
    .then(response => response.json())
}