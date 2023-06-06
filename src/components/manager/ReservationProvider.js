import { getToken } from "./TokenProvider"

export const requestSwap =(id, object) => {
    let token = getToken()
    return fetch(`http://localhost:8000/properties/${id}/make_reservation`, {
        method: "POST",
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
        .then(response => response.json())}
export const getMySwaps =() => {
    let token = getToken()
    return fetch("http://localhost:8000/reservations/my_swaps", {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}
export const getMySwapsByStatus =(status) => {
    let token = getToken()
    return fetch(`http://localhost:8000/reservations/my_swaps?status=${status}`, {
        headers:{
            "Authorization": `Token ${token}`,
             "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}