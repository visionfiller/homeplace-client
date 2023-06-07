import { getToken } from "./TokenProvider"

export const getSwapperById =(id) => {
    let token = getToken()
    return fetch(`http://localhost:8000/swappers/${id}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}