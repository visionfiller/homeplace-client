import { getToken } from "./TokenProvider"

export const getAllPropertyTypes =() => {
    let token = getToken()
    return fetch("http://localhost:8000/propertytypes", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
