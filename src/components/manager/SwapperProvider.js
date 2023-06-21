import { getToken } from "./TokenProvider"

export const getSwapperSignedIn =() => {
    let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/swappers/my_profile`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getSwapperById =(id) => {
    // let token = getToken()
    return fetch(`https://homeplace-server-8a8a3a38456a.herokuapp.com/swappers/${id}`, {
        headers:{
            // "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}