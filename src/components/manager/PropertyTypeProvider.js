import { getToken } from "./TokenProvider"

export const getAllPropertyTypes =() => {
    // let token = getToken()
    return fetch("https://homeplace-server-8a8a3a38456a.herokuapp.com/propertytypes", {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}

export const getSinglePropertyType =(id) => {
    // let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/propertytypes/${id}`, {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
